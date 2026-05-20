"""
Tests for .coderabbit.yaml

Covers changes introduced in this PR:
- path_filters moved from top-level to under reviews section
- tone_instructions simplified and shortened
- Overall YAML validity and structure
"""

import os
import unittest
import yaml

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = os.path.join(REPO_ROOT, ".coderabbit.yaml")


def load_config():
    with open(CONFIG_PATH, "r") as f:
        return yaml.safe_load(f)


class TestCodeRabbitYamlValidity(unittest.TestCase):
    """The file must parse as valid YAML."""

    def test_file_exists(self):
        self.assertTrue(os.path.exists(CONFIG_PATH), ".coderabbit.yaml must exist")

    def test_parses_as_valid_yaml(self):
        config = load_config()
        self.assertIsInstance(config, dict, "Top-level YAML must be a mapping")

    def test_not_empty(self):
        config = load_config()
        self.assertGreater(len(config), 0, "Config must not be empty")


class TestTopLevelFields(unittest.TestCase):
    """Top-level required fields must be present."""

    def setUp(self):
        self.config = load_config()

    def test_language_field_present(self):
        self.assertIn("language", self.config)

    def test_language_is_en_us(self):
        self.assertEqual(self.config["language"], "en-US")

    def test_tone_instructions_present(self):
        self.assertIn("tone_instructions", self.config)

    def test_reviews_section_present(self):
        self.assertIn("reviews", self.config)

    def test_chat_section_present(self):
        self.assertIn("chat", self.config)

    def test_knowledge_base_section_present(self):
        self.assertIn("knowledge_base", self.config)

    def test_no_top_level_path_filters(self):
        """PR change: path_filters moved from top-level into reviews section."""
        self.assertNotIn(
            "path_filters",
            self.config,
            "path_filters must NOT be at top-level (it was moved under reviews)",
        )


class TestToneInstructions(unittest.TestCase):
    """tone_instructions was simplified in this PR."""

    def setUp(self):
        self.config = load_config()
        self.tone = self.config.get("tone_instructions", "")

    def test_tone_instructions_is_string(self):
        self.assertIsInstance(self.tone, str)

    def test_tone_mentions_sentinel(self):
        self.assertIn("Sentinel", self.tone)

    def test_tone_mentions_lorapok_labs(self):
        self.assertIn("Lorapok Labs", self.tone)

    def test_tone_mentions_biological_ui(self):
        self.assertIn("Biological UI", self.tone)

    def test_tone_mentions_css_modules(self):
        self.assertIn("CSS Modules", self.tone)

    def test_tone_mentions_design_tokens(self):
        # The phrase may appear on a single line or split across a line break.
        normalised = self.tone.replace("\n", " ").lower()
        self.assertIn("design tokens", normalised)

    def test_tone_not_empty(self):
        self.assertTrue(len(self.tone.strip()) > 0)

    def test_tone_does_not_contain_tech_stack_list(self):
        """PR simplified tone by removing detailed tech stack enumeration."""
        # The old tone contained "React 19, TypeScript, Vite 8" — new one should not
        self.assertNotIn("React 19, TypeScript, Vite 8", self.tone)

    def test_tone_does_not_contain_cyberlara_reference(self):
        """PR removed CyberLarva mascot mention from tone_instructions."""
        self.assertNotIn("CyberLarva", self.tone)

    def test_tone_does_not_contain_browserrouter_prohibition(self):
        """PR removed detailed tech prohibition list from tone."""
        self.assertNotIn("no BrowserRouter", self.tone)


class TestReviewsSection(unittest.TestCase):
    """reviews section structure and path_filters placement."""

    def setUp(self):
        self.config = load_config()
        self.reviews = self.config.get("reviews", {})

    def test_reviews_is_dict(self):
        self.assertIsInstance(self.reviews, dict)

    def test_profile_is_assertive(self):
        self.assertEqual(self.reviews.get("profile"), "assertive")

    def test_request_changes_workflow_enabled(self):
        self.assertTrue(self.reviews.get("request_changes_workflow"))

    def test_high_level_summary_enabled(self):
        self.assertTrue(self.reviews.get("high_level_summary"))

    def test_poem_disabled(self):
        self.assertFalse(self.reviews.get("poem"))

    def test_sequence_diagrams_enabled(self):
        self.assertTrue(self.reviews.get("sequence_diagrams"))

    def test_auto_review_section_present(self):
        self.assertIn("auto_review", self.reviews)

    def test_path_filters_inside_reviews(self):
        """PR change: path_filters now lives under reviews, not at top-level."""
        self.assertIn(
            "path_filters",
            self.reviews,
            "path_filters must be nested inside the reviews section",
        )

    def test_path_filters_is_list(self):
        path_filters = self.reviews.get("path_filters", [])
        self.assertIsInstance(path_filters, list)

    def test_path_filters_excludes_package_lock(self):
        path_filters = self.reviews.get("path_filters", [])
        self.assertIn("!app/package-lock.json", path_filters)

    def test_path_filters_excludes_dist(self):
        path_filters = self.reviews.get("path_filters", [])
        self.assertIn("!**/dist/**", path_filters)

    def test_path_filters_excludes_min_js(self):
        path_filters = self.reviews.get("path_filters", [])
        self.assertIn("!**/*.min.js", path_filters)

    def test_path_filters_excludes_min_css(self):
        path_filters = self.reviews.get("path_filters", [])
        self.assertIn("!**/*.min.css", path_filters)

    def test_path_filters_has_exactly_four_entries(self):
        path_filters = self.reviews.get("path_filters", [])
        self.assertEqual(len(path_filters), 4)

    def test_path_instructions_present(self):
        self.assertIn("path_instructions", self.reviews)

    def test_path_instructions_is_list(self):
        self.assertIsInstance(self.reviews.get("path_instructions"), list)


class TestAutoReview(unittest.TestCase):
    """auto_review subsection within reviews."""

    def setUp(self):
        self.config = load_config()
        self.auto_review = self.config["reviews"].get("auto_review", {})

    def test_auto_review_enabled(self):
        self.assertTrue(self.auto_review.get("enabled"))

    def test_auto_review_drafts_disabled(self):
        self.assertFalse(self.auto_review.get("drafts"))

    def test_auto_review_base_branches_includes_main(self):
        branches = self.auto_review.get("base_branches", [])
        self.assertIn("main", branches)


class TestPathInstructions(unittest.TestCase):
    """path_instructions entries must cover expected paths."""

    def setUp(self):
        self.config = load_config()
        self.instructions = self.config["reviews"].get("path_instructions", [])
        self.paths = [entry.get("path") for entry in self.instructions]

    def test_components_path_covered(self):
        self.assertIn("app/src/components/**", self.paths)

    def test_pages_path_covered(self):
        self.assertIn("app/src/pages/**", self.paths)

    def test_data_path_covered(self):
        self.assertIn("app/src/data/**", self.paths)

    def test_styles_path_covered(self):
        self.assertIn("app/src/styles/**", self.paths)

    def test_lorapok_path_covered(self):
        self.assertIn(".lorapok/**", self.paths)

    def test_package_json_path_covered(self):
        self.assertIn("app/package.json", self.paths)

    def test_each_instruction_has_instructions_text(self):
        for entry in self.instructions:
            with self.subTest(path=entry.get("path")):
                self.assertIn("instructions", entry)
                self.assertIsInstance(entry["instructions"], str)
                self.assertGreater(len(entry["instructions"].strip()), 0)


class TestChatSection(unittest.TestCase):
    def setUp(self):
        self.config = load_config()

    def test_chat_auto_reply_enabled(self):
        self.assertTrue(self.config["chat"].get("auto_reply"))


class TestKnowledgeBaseSection(unittest.TestCase):
    def setUp(self):
        self.config = load_config()
        self.kb = self.config.get("knowledge_base", {})

    def test_knowledge_base_is_dict(self):
        self.assertIsInstance(self.kb, dict)

    def test_learnings_scope_is_auto(self):
        learnings = self.kb.get("learnings", {})
        self.assertEqual(learnings.get("scope"), "auto")

    def test_opt_out_is_false(self):
        self.assertFalse(self.kb.get("opt_out"))


class TestPathFiltersAreOnlyInReviews(unittest.TestCase):
    """Regression: path_filters must appear exactly once, inside reviews."""

    def setUp(self):
        self.config = load_config()

    def test_path_filters_not_at_root(self):
        self.assertNotIn("path_filters", self.config)

    def test_path_filters_in_reviews(self):
        self.assertIn("path_filters", self.config.get("reviews", {}))

    def test_path_filters_all_are_exclusions(self):
        """All current filters are negation patterns (start with !)."""
        path_filters = self.config["reviews"].get("path_filters", [])
        for f in path_filters:
            with self.subTest(filter=f):
                self.assertTrue(
                    f.startswith("!"),
                    f"Filter '{f}' should be an exclusion (start with !)",
                )


if __name__ == "__main__":
    unittest.main()