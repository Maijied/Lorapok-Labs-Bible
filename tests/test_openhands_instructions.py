"""
Tests for .openhands_instructions

This file is brand-new in this PR (did not exist before).
Covers:
- File existence and non-empty content
- Identity: Morpheus / Lorapok Labs
- Critical context section accuracy
- Three mandatory validation gates
- All guardrail rules
"""

import os
import re
import unittest

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INSTRUCTIONS_PATH = os.path.join(REPO_ROOT, ".openhands_instructions")


def load_instructions():
    with open(INSTRUCTIONS_PATH, "r") as f:
        return f.read()


class TestFilePresence(unittest.TestCase):
    def test_file_exists(self):
        self.assertTrue(
            os.path.exists(INSTRUCTIONS_PATH),
            ".openhands_instructions must exist",
        )

    def test_file_not_empty(self):
        content = load_instructions()
        self.assertGreater(len(content.strip()), 0)


class TestAgentIdentity(unittest.TestCase):
    def setUp(self):
        self.content = load_instructions()

    def test_identifies_as_morpheus(self):
        self.assertIn("Morpheus", self.content)

    def test_identifies_as_issue_resolver(self):
        self.assertIn("Issue Resolver", self.content)

    def test_identifies_lorapok_labs(self):
        self.assertIn("Lorapok Labs", self.content)


class TestCriticalContextSection(unittest.TestCase):
    """The CRITICAL CONTEXT section must document the app layout and tech stack."""

    def setUp(self):
        self.content = load_instructions()

    def test_critical_context_heading_present(self):
        self.assertIn("CRITICAL CONTEXT", self.content)

    def test_app_directory_specified(self):
        """Agent must be told the app lives in app/, not the repo root."""
        self.assertIn("app/", self.content)

    def test_npm_commands_run_from_app_dir(self):
        """Instruction must clarify npm commands should run from app/."""
        self.assertIn("npm", self.content)
        # The file must mention running npm commands from app/
        self.assertTrue(
            re.search(r"(npm|from)\s+app/", self.content)
            or "Run npm commands from app/" in self.content,
            "Instructions must state npm commands run from app/",
        )

    def test_react_version_mentioned(self):
        self.assertIn("React 19", self.content)

    def test_typescript_mentioned(self):
        self.assertIn("TypeScript", self.content)

    def test_vite_version_mentioned(self):
        self.assertIn("Vite 8", self.content)

    def test_hashrouter_mentioned(self):
        self.assertIn("HashRouter", self.content)

    def test_github_pages_mentioned(self):
        self.assertIn("GitHub Pages", self.content)

    def test_css_modules_mentioned(self):
        self.assertIn("CSS Modules", self.content)

    def test_design_tokens_path_mentioned(self):
        """Path to design tokens must be documented."""
        self.assertIn("tokens.css", self.content)

    def test_icons_library_mentioned(self):
        self.assertIn("Lucide React", self.content)

    def test_lucide_pascal_case_mentioned(self):
        self.assertIn("PascalCase", self.content)

    def test_playbooks_directory_mentioned(self):
        self.assertIn(".lorapok/playbooks/", self.content)


class TestValidationGates(unittest.TestCase):
    """
    The three mandatory gates that must pass before opening a PR:
      1. brand-guard.mjs
      2. npm run lint
      3. npm run build
    """

    def setUp(self):
        self.content = load_instructions()

    def test_all_three_gates_must_pass(self):
        self.assertIn("BEFORE OPENING A PR", self.content)

    def test_gate_1_brand_guard_script(self):
        self.assertIn("brand-guard.mjs", self.content)

    def test_gate_1_brand_guard_run_from_repo_root(self):
        """brand-guard.mjs must be run from repo root, not app/."""
        self.assertIn("repo root", self.content)

    def test_gate_2_lint_command(self):
        self.assertIn("npm run lint", self.content)

    def test_gate_3_build_command(self):
        self.assertIn("npm run build", self.content)

    def test_gates_are_numbered(self):
        """Gates must be presented as an ordered list (1, 2, 3)."""
        self.assertIn("1.", self.content)
        self.assertIn("2.", self.content)
        self.assertIn("3.", self.content)

    def test_brand_guard_uses_node(self):
        """Gate 1 must invoke via node command."""
        self.assertIn("node .lorapok/scripts/brand-guard.mjs", self.content)

    def test_lint_runs_in_app_dir(self):
        """Gate 2 must change to app/ directory before running lint."""
        lines = self.content.splitlines()
        lint_line = next((l for l in lines if "npm run lint" in l), "")
        self.assertIn("cd app", lint_line)

    def test_build_runs_in_app_dir(self):
        """Gate 3 must change to app/ directory before running build."""
        lines = self.content.splitlines()
        build_line = next((l for l in lines if "npm run build" in l), "")
        self.assertIn("cd app", build_line)


class TestGuardrails(unittest.TestCase):
    """All guardrail rules must be present."""

    def setUp(self):
        self.content = load_instructions()

    def test_guardrails_section_present(self):
        self.assertIn("GUARDRAILS", self.content)

    def test_no_browser_router_rule(self):
        self.assertIn("BrowserRouter", self.content)
        self.assertIn("HashRouter", self.content)

    def test_no_tailwind_rule(self):
        self.assertIn("Tailwind", self.content)

    def test_no_css_in_js_rule(self):
        """styled-components and Emotion must be named as forbidden."""
        self.assertIn("CSS-in-JS", self.content)
        # At least one specific CSS-in-JS library must be called out
        css_in_js_libs = ["styled-components", "Emotion"]
        has_lib = any(lib in self.content for lib in css_in_js_libs)
        self.assertTrue(has_lib, "At least one CSS-in-JS library must be named in guardrails")

    def test_no_backend_deps_rule(self):
        self.assertIn("express", self.content)
        self.assertIn("fastify", self.content)
        self.assertIn("koa", self.content)

    def test_no_any_type_rule(self):
        self.assertIn("any type", self.content)

    def test_brand_guard_ignore_comment_mentioned(self):
        """Workaround for 'any' type must be documented."""
        self.assertIn("brand-guard-ignore", self.content)

    def test_data_location_rule(self):
        """Data must live in app/src/data/*.ts, not hardcoded in pages."""
        self.assertIn("app/src/data/", self.content)

    def test_components_arrow_function_rule(self):
        self.assertIn("arrow functions", self.content)

    def test_no_react_fc_rule(self):
        self.assertIn("React.FC", self.content)


class TestContentStructureAndFormat(unittest.TestCase):
    """Structural / formatting checks for the instructions file."""

    def setUp(self):
        self.content = load_instructions()
        self.lines = self.content.splitlines()

    def test_file_ends_with_newline(self):
        with open(INSTRUCTIONS_PATH, "rb") as f:
            raw = f.read()
        self.assertTrue(
            raw.endswith(b"\n"),
            ".openhands_instructions should end with a newline",
        )

    def test_no_windows_line_endings(self):
        self.assertNotIn("\r\n", self.content)

    def test_no_trailing_whitespace_on_any_line(self):
        for i, line in enumerate(self.lines, start=1):
            with self.subTest(line_number=i):
                self.assertEqual(
                    line,
                    line.rstrip(),
                    f"Line {i} has trailing whitespace: {repr(line)}",
                )

    def test_file_has_at_least_three_sections(self):
        """File should have at least: identity statement, context, guardrails."""
        section_keywords = ["CRITICAL CONTEXT", "BEFORE OPENING A PR", "GUARDRAILS"]
        found = [kw for kw in section_keywords if kw in self.content]
        self.assertEqual(
            len(found),
            len(section_keywords),
            f"Missing sections: {set(section_keywords) - set(found)}",
        )

    def test_line_count_is_reasonable(self):
        """File should be concise — not too short (trivial) or too long (bloated)."""
        non_empty = [l for l in self.lines if l.strip()]
        self.assertGreaterEqual(len(non_empty), 10, "File seems too short")
        self.assertLessEqual(len(non_empty), 100, "File seems unexpectedly long")

    def test_no_placeholder_or_todo_text(self):
        lower = self.content.lower()
        for word in ("todo", "fixme", "placeholder", "lorem ipsum"):
            with self.subTest(word=word):
                self.assertNotIn(word, lower)


class TestGuardrailsCompleteness(unittest.TestCase):
    """Regression: all six guardrail bullets must be present."""

    def setUp(self):
        self.content = load_instructions()

    def _count_guardrail_bullets(self):
        in_guardrails = False
        bullets = []
        for line in self.content.splitlines():
            if "GUARDRAILS" in line:
                in_guardrails = True
                continue
            if in_guardrails and line.startswith("-"):
                bullets.append(line)
        return bullets

    def test_six_guardrail_bullets_present(self):
        bullets = self._count_guardrail_bullets()
        self.assertEqual(
            len(bullets),
            6,
            f"Expected 6 guardrail bullets, found {len(bullets)}: {bullets}",
        )

    def test_guardrail_bullets_are_non_empty(self):
        bullets = self._count_guardrail_bullets()
        for bullet in bullets:
            with self.subTest(bullet=bullet):
                self.assertGreater(len(bullet.strip("- ").strip()), 0)


if __name__ == "__main__":
    unittest.main()