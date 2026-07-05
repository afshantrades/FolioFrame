from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[2]
CLOSING_DIR = ROOT / "docs" / "closing-package"
OUTPUT_PDF = CLOSING_DIR / "FolioFrame_Closing_Package_v1.pdf"
LOGO_PATH = ROOT / "public" / "assets" / "logos" / "APPROVED_primary_logo_transparent.png"
COVER_VISUAL_PATH = ROOT / "public" / "assets" / "visuals_01_to_10" / "visual_10_Sale_Room_Cover.png"

DOCUMENTS = [
    ("FOLIOFRAME_CLOSING_PACKAGE_SOURCE.md", "Closing Package Source"),
    ("FOLIOFRAME_TRANSACTION_SUMMARY.md", "Transaction Summary"),
    ("FOLIOFRAME_ASSET_TRANSFER_SCHEDULE.md", "Asset Transfer Schedule"),
    ("FOLIOFRAME_IP_LICENSE_TRANSFER_CHECKLIST.md", "IP License Transfer Checklist"),
    ("FOLIOFRAME_TECHNICAL_HANDOVER.md", "Technical Handover"),
    ("FOLIOFRAME_COMMERCIAL_MATERIALS_INDEX.md", "Commercial Materials Index"),
    ("FOLIOFRAME_DEPLOYMENT_TRANSITION_PLAN.md", "Deployment Transition Plan"),
    ("FOLIOFRAME_RED_FLAG_DISCLOSURE.md", "Red Flag Disclosure"),
    ("FOLIOFRAME_CLOSING_CHECKLIST.md", "Closing Checklist"),
    ("FOLIOFRAME_CLOSING_SIGN_OFF.md", "Closing Sign-Off"),
    ("FOLIOFRAME_CLOSING_PACKAGE_MANIFEST.md", "Closing Package Manifest"),
]

LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
INLINE_CODE_PATTERN = re.compile(r"`([^`]+)`")
STRONG_PATTERN = re.compile(r"\*\*([^*]+)\*\*")
NUMBERED_PATTERN = re.compile(r"^\d+\. ")


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=25,
            leading=31,
            textColor=colors.HexColor("#061B3D"),
            spaceAfter=14,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=16,
            textColor=colors.HexColor("#273248"),
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocTitle",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=23,
            textColor=colors.HexColor("#061B3D"),
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeadingTwo",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=colors.HexColor("#061B3D"),
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyClean",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#273248"),
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletClean",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12.5,
            textColor=colors.HexColor("#273248"),
            leftIndent=12,
            firstLineIndent=0,
            spaceAfter=3,
        )
    )
    return styles


def convert_inline(text: str) -> str:
    escaped = html.escape(text.strip())
    escaped = LINK_PATTERN.sub(lambda match: html.escape(match.group(1)), escaped)
    escaped = INLINE_CODE_PATTERN.sub(lambda match: f"<font name='Courier'>{match.group(1)}</font>", escaped)
    escaped = STRONG_PATTERN.sub(lambda match: f"<b>{match.group(1)}</b>", escaped)
    return escaped


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#64748B"))
    canvas.drawString(0.65 * inch, 0.45 * inch, "FolioFrame Closing Package v1")
    canvas.drawRightString(7.85 * inch, 0.45 * inch, f"Page {doc.page}")
    canvas.restoreState()


def add_markdown_file(story, path: Path, styles) -> None:
    for line in path.read_text(encoding="utf-8").splitlines():
        raw = line.rstrip()
        if not raw:
            story.append(Spacer(1, 3))
        elif raw.startswith("# "):
            story.append(Paragraph(convert_inline(raw[2:]), styles["DocTitle"]))
        elif raw.startswith("## "):
            story.append(Paragraph(convert_inline(raw[3:]), styles["HeadingTwo"]))
        elif raw.startswith("### "):
            story.append(Paragraph(f"<b>{convert_inline(raw[4:])}</b>", styles["BodyClean"]))
        elif raw.startswith("- [ ] "):
            story.append(Paragraph("&#9744; " + convert_inline(raw[6:]), styles["BulletClean"]))
        elif raw.startswith("- "):
            story.append(Paragraph("&bull; " + convert_inline(raw[2:]), styles["BulletClean"]))
        elif NUMBERED_PATTERN.match(raw):
            story.append(Paragraph(convert_inline(raw), styles["BodyClean"]))
        elif raw.startswith("```"):
            story.append(Spacer(1, 2))
        else:
            story.append(Paragraph(convert_inline(raw), styles["BodyClean"]))


def build_pdf() -> None:
    for required in [LOGO_PATH, COVER_VISUAL_PATH]:
        if not required.exists():
            raise FileNotFoundError(required)

    styles = build_styles()
    story = []

    logo = Image(str(LOGO_PATH), width=2.55 * inch, height=0.66 * inch)
    logo.hAlign = "LEFT"
    story.append(logo)
    story.append(Spacer(1, 0.45 * inch))
    story.append(Paragraph("FolioFrame Closing Package", styles["CoverTitle"]))
    story.append(Paragraph("Deterministic source-rendered handover package", styles["CoverSub"]))
    story.append(Paragraph("Generated date: 2026-07-05", styles["CoverSub"]))
    story.append(Paragraph("Source branch: folioframe/deploy-production-static-demo", styles["CoverSub"]))
    story.append(Paragraph("Source baseline commit: 8e6f830", styles["CoverSub"]))
    story.append(Spacer(1, 0.2 * inch))
    cover = Image(str(COVER_VISUAL_PATH), width=6.2 * inch, height=3.49 * inch)
    cover.hAlign = "LEFT"
    story.append(cover)
    story.append(Spacer(1, 0.18 * inch))
    story.append(
        Paragraph(
            "FolioFrame is packaged here as a static service website and static portal/demo surface. "
            "It is not represented as live SaaS, live billing, production auth, live customer data, "
            "live monitoring or automated fulfilment.",
            styles["CoverSub"],
        )
    )
    story.append(PageBreak())

    story.append(Paragraph("Included Source Documents", styles["DocTitle"]))
    for _, title in DOCUMENTS:
        story.append(Paragraph("&bull; " + html.escape(title), styles["BulletClean"]))
    story.append(PageBreak())

    for index, (filename, _) in enumerate(DOCUMENTS):
        add_markdown_file(story, CLOSING_DIR / filename, styles)
        if index != len(DOCUMENTS) - 1:
            story.append(PageBreak())

    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=LETTER,
        rightMargin=0.65 * inch,
        leftMargin=0.65 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title="FolioFrame Closing Package v1",
        author="FolioFrame",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()
