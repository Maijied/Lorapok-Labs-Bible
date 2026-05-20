"""
Tests for .github/workflows/openhands-resolver.yml

Covers changes introduced in this PR:
- Migration from custom docker run job to official reusable workflow
- New event triggers: pull_request (labeled), pull_request_review_comment, pull_request_review
- New job inputs: macro, max_iterations, LLM_MODEL, target_branch
- New required secrets: PAT_TOKEN, PAT_USERNAME, LLM_BASE_URL
- LLM_MODEL sourced from vars (Actions Variables) instead of secrets
"""

import os
import unittest
import yaml

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORKFLOW_PATH = os.path.join(
    REPO_ROOT, ".github", "workflows", "openhands-resolver.yml"
)


def load_workflow():
    with open(WORKFLOW_PATH, "r") as f:
        return yaml.safe_load(f)


class TestWorkflowFileValidity(unittest.TestCase):
    def test_file_exists(self):
        self.assertTrue(os.path.exists(WORKFLOW_PATH))

    def test_parses_as_valid_yaml(self):
        wf = load_workflow()
        self.assertIsInstance(wf, dict)

    def test_not_empty(self):
        wf = load_workflow()
        self.assertGreater(len(wf), 0)


class TestWorkflowName(unittest.TestCase):
    def setUp(self):
        self.wf = load_workflow()

    def test_name_field_present(self):
        self.assertIn("name", self.wf)

    def test_name_contains_morpheus(self):
        self.assertIn("Morpheus", self.wf["name"])


class TestWorkflowTriggers(unittest.TestCase):
    """
    PR added three new triggers:
      - pull_request: [labeled]
      - pull_request_review_comment: [created]
      - pull_request_review: [submitted]
    """

    def setUp(self):
        self.wf = load_workflow()
        # PyYAML (YAML 1.1) parses the bare key 'on' as the boolean True.
        # We must look up True, not the string "on".
        self.on = self.wf.get(True, {})

    def test_on_section_present(self):
        self.assertIsNotNone(self.on)

    def test_issues_labeled_trigger(self):
        """Pre-existing trigger must still be present."""
        issues = self.on.get("issues", {})
        self.assertIn("labeled", issues.get("types", []))

    def test_issue_comment_created_trigger(self):
        """Pre-existing trigger must still be present."""
        ic = self.on.get("issue_comment", {})
        self.assertIn("created", ic.get("types", []))

    def test_pull_request_labeled_trigger_added(self):
        """New trigger: workflow now reacts to labeled PRs."""
        pr = self.on.get("pull_request", {})
        self.assertIsNotNone(pr, "pull_request trigger must be present")
        self.assertIn("labeled", pr.get("types", []))

    def test_pull_request_review_comment_created_trigger_added(self):
        """New trigger: workflow now reacts to new PR review comments."""
        prc = self.on.get("pull_request_review_comment", {})
        self.assertIsNotNone(prc, "pull_request_review_comment trigger must be present")
        self.assertIn("created", prc.get("types", []))

    def test_pull_request_review_submitted_trigger_added(self):
        """New trigger: workflow now reacts to submitted PR reviews."""
        prr = self.on.get("pull_request_review", {})
        self.assertIsNotNone(prr, "pull_request_review trigger must be present")
        self.assertIn("submitted", prr.get("types", []))

    def test_total_trigger_event_count(self):
        """Expect exactly 5 top-level trigger events after the PR."""
        expected_events = {
            "issues",
            "pull_request",
            "issue_comment",
            "pull_request_review_comment",
            "pull_request_review",
        }
        self.assertEqual(set(self.on.keys()), expected_events)


class TestWorkflowPermissions(unittest.TestCase):
    def setUp(self):
        self.wf = load_workflow()
        self.perms = self.wf.get("permissions", {})

    def test_permissions_section_present(self):
        self.assertIn("permissions", self.wf)

    def test_contents_write(self):
        self.assertEqual(self.perms.get("contents"), "write")

    def test_pull_requests_write(self):
        self.assertEqual(self.perms.get("pull-requests"), "write")

    def test_issues_write(self):
        self.assertEqual(self.perms.get("issues"), "write")


class TestWorkflowJob(unittest.TestCase):
    def setUp(self):
        self.wf = load_workflow()
        self.jobs = self.wf.get("jobs", {})
        self.morpheus = self.jobs.get("morpheus", {})

    def test_morpheus_job_exists(self):
        self.assertIn("morpheus", self.jobs)

    def test_job_uses_reusable_workflow(self):
        """PR migrated from docker run steps to an official reusable workflow."""
        uses = self.morpheus.get("uses", "")
        self.assertTrue(
            uses.startswith("All-Hands-AI/OpenHands/"),
            f"Job must use the official OpenHands reusable workflow, got: '{uses}'",
        )

    def test_reusable_workflow_pinned_to_commit_sha(self):
        """Pinning to a commit SHA is a security best practice."""
        uses = self.morpheus.get("uses", "")
        # SHA is at least 7 hex chars after '@'
        parts = uses.split("@")
        self.assertEqual(len(parts), 2, "uses reference must contain '@'")
        sha = parts[1]
        self.assertTrue(
            len(sha) >= 7 and all(c in "0123456789abcdef" for c in sha.lower()),
            f"Workflow ref should be pinned to a commit SHA, got: '{sha}'",
        )

    def test_job_does_not_have_runs_on(self):
        """Reusable workflow jobs should not specify runs-on (caller side)."""
        self.assertNotIn("runs-on", self.morpheus)

    def test_job_does_not_have_steps(self):
        """Reusable workflow caller should not define steps."""
        self.assertNotIn("steps", self.morpheus)


class TestWorkflowJobInputs(unittest.TestCase):
    """The 'with' inputs passed to the reusable workflow."""

    def setUp(self):
        self.wf = load_workflow()
        self.with_block = self.wf["jobs"]["morpheus"].get("with", {})

    def test_with_block_present(self):
        self.assertIsNotNone(self.with_block)

    def test_macro_input_is_openhands_agent(self):
        """Trigger macro set to '@openhands-agent' as documented in the file header."""
        self.assertEqual(self.with_block.get("macro"), "@openhands-agent")

    def test_max_iterations_is_50(self):
        self.assertEqual(self.with_block.get("max_iterations"), 50)

    def test_llm_model_uses_vars_not_secrets(self):
        """PR changed LLM_MODEL from secrets.LLM_MODEL to vars.LLM_MODEL."""
        llm_model_value = str(self.with_block.get("LLM_MODEL", ""))
        self.assertIn(
            "vars.LLM_MODEL",
            llm_model_value,
            "LLM_MODEL must reference vars.LLM_MODEL (Actions Variable), not a secret",
        )
        self.assertNotIn("secrets.LLM_MODEL", llm_model_value)

    def test_llm_model_has_default_value(self):
        """Default model must be google/gemini-2.5-flash."""
        llm_model_value = str(self.with_block.get("LLM_MODEL", ""))
        self.assertIn("google/gemini-2.5-flash", llm_model_value)

    def test_target_branch_is_main(self):
        self.assertEqual(self.with_block.get("target_branch"), "main")


class TestWorkflowJobSecrets(unittest.TestCase):
    """Secrets passed to the reusable workflow."""

    def setUp(self):
        self.wf = load_workflow()
        self.secrets_block = self.wf["jobs"]["morpheus"].get("secrets", {})

    def test_secrets_block_present(self):
        self.assertIsNotNone(self.secrets_block)

    def test_pat_token_secret_passed(self):
        """New required secret: PAT_TOKEN."""
        self.assertIn("PAT_TOKEN", self.secrets_block)
        self.assertIn("secrets.PAT_TOKEN", str(self.secrets_block["PAT_TOKEN"]))

    def test_pat_username_secret_passed(self):
        """New required secret: PAT_USERNAME."""
        self.assertIn("PAT_USERNAME", self.secrets_block)
        self.assertIn("secrets.PAT_USERNAME", str(self.secrets_block["PAT_USERNAME"]))

    def test_llm_api_key_secret_passed(self):
        self.assertIn("LLM_API_KEY", self.secrets_block)
        self.assertIn("secrets.LLM_API_KEY", str(self.secrets_block["LLM_API_KEY"]))

    def test_llm_base_url_secret_passed(self):
        """New optional secret: LLM_BASE_URL."""
        self.assertIn("LLM_BASE_URL", self.secrets_block)
        self.assertIn("secrets.LLM_BASE_URL", str(self.secrets_block["LLM_BASE_URL"]))

    def test_no_github_token_in_secrets_block(self):
        """Reusable workflow handles its own GitHub token; caller should not pass it."""
        self.assertNotIn("GITHUB_TOKEN", self.secrets_block)


class TestWorkflowHeaderComment(unittest.TestCase):
    """Key documentation in the file header was updated in this PR."""

    def setUp(self):
        with open(WORKFLOW_PATH, "r") as f:
            self.raw = f.read()

    def test_mentions_openhands_agent_macro(self):
        self.assertIn("@openhands-agent", self.raw)

    def test_mentions_pat_token_secret(self):
        self.assertIn("PAT_TOKEN", self.raw)

    def test_mentions_pat_username_secret(self):
        self.assertIn("PAT_USERNAME", self.raw)

    def test_mentions_llm_model_as_optional_variable(self):
        self.assertIn("LLM_MODEL", self.raw)
        self.assertIn("Optional Variables", self.raw)

    def test_no_docker_run_references(self):
        """Old implementation used docker run; new one uses reusable workflow."""
        self.assertNotIn("docker run", self.raw)

    def test_no_ghcr_io_references(self):
        """Old implementation pulled from ghcr.io; new one delegates to reusable workflow."""
        self.assertNotIn("ghcr.io", self.raw)

    def test_uses_official_reusable_workflow_reference(self):
        self.assertIn("All-Hands-AI/OpenHands", self.raw)

    def test_mentions_fix_me_label(self):
        self.assertIn("fix-me", self.raw)


class TestWorkflowRegressions(unittest.TestCase):
    """Ensure old implementation details are fully removed."""

    def setUp(self):
        with open(WORKFLOW_PATH, "r") as f:
            self.raw = f.read()
        self.wf = load_workflow()

    def test_no_checkout_step(self):
        self.assertNotIn("actions/checkout", self.raw)

    def test_no_resolve_issue_python_command(self):
        self.assertNotIn("openhands.resolver.resolve_issue", self.raw)

    def test_no_repo_instruction_file_flag(self):
        self.assertNotIn("repo-instruction-file", self.raw)

    def test_no_issue_type_flag(self):
        self.assertNotIn("--issue-type", self.raw)

    def test_if_condition_removed_from_job(self):
        """Old job had an explicit 'if:' filter; new one delegates filtering to reusable workflow."""
        morpheus = self.wf["jobs"]["morpheus"]
        self.assertNotIn("if", morpheus)


if __name__ == "__main__":
    unittest.main()
