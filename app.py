import os
import io
import csv
import json
import sqlite3
import secrets
import re
import zipfile
import base64
from flask import send_file
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
from datetime import datetime, timezone
from functools import wraps

import requests
from dotenv import load_dotenv
from flask import (
    Flask, request, jsonify, render_template,
    redirect, url_for, session, flash
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

load_dotenv()

# ---------------------------------------------------------
# KOOKSY AI - FLASK BACKEND
# Intelligence with a Spark
# ---------------------------------------------------------

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "")
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024  # 10 MB
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = (
    os.getenv("COOKIE_SECURE", "false").lower() == "true"
)

if not app.config["SECRET_KEY"]:
    # For development only. Set a permanent secret in .env for deployment.
    app.config["SECRET_KEY"] = secrets.token_hex(32)
    print("WARNING: Set FLASK_SECRET_KEY in .env for persistent sessions.")

DATABASE = os.getenv("DATABASE_PATH", "kooksy_ai.db")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

MAX_PROMPT_LENGTH = 1_000_000
MAX_CONTEXT_LENGTH = 25_000
MAX_HISTORY_MESSAGES = 20

ALLOWED_EXTENSIONS = {
    "csv", "txt", "md", "pdf", "docx", "json",
    "py", "html", "css", "js", "log"
}

LANGUAGES = {
    "en": "English",
    "zh-CN": "Chinese",
    "hi": "Hindi",
    "es": "Spanish",
    "ar": "Arabic",
    "fr": "French",
    "bn": "Bengali",
    "pt": "Portuguese",
    "ru": "Russian",
    "ur": "Urdu",
    "ja": "Japanese",
    "de": "German",
    "ta": "Tamil",
    "te": "Telugu",
    "ko": "Korean",
}

# ---------------------------------------------------------
# DATABASE
# ---------------------------------------------------------

def get_db():
    connection = sqlite3.connect(DATABASE, timeout=15)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def init_db():
    with get_db() as db:
        db.executescript("""
            CREATE TABLE IF NOT EXISTS users (
                        "count": summary["count"],
            "average_rating": round(
                summary["average"] or 0, 2
            ),
            "feedback": [dict(row) for row in rows],
        })

    except Exception:
        app.logger.exception("Failed to load admin feedback.")
        return error_response(
            "Unable to load admin feedback.",
            500
        )


# ---------------------------------------------------------
# OPTIONAL ADMIN FEEDBACK VIEW
# Configure ADMIN_USERNAME in environment variables.
# ---------------------------------------------------------

@app.get("/admin/feedback")
@login_required
def admin_feedback():
    admin_username = os.getenv("ADMIN_USERNAME", "").strip()
    current_username = session.get("username", "")

    # Verify admin access
    if (
        not admin_username
        or not isinstance(current_username, str)
        or current_username.casefold() != admin_username.casefold()
    ):
        return error_response("Access denied.", 403)

    with get_db() as db:
        rows = db.execute(
            """
            SELECT
                f.name,
                f.role,
                f.state,
                f.rating,
                f.message,
                f.created_at,
                u.username
            FROM feedback AS f
            JOIN users AS u ON u.id = f.user_id
            ORDER BY f.id DESC
            """
        ).fetchall()

        summary = db.execute(
            """
            SELECT
                COUNT(*) AS count,
                AVG(rating) AS average
            FROM feedback
            """
        ).fetchone()

    return jsonify({
        "success": True,
        "count": summary["count"],
        "average_rating": round(summary["average"] or 0, 2),
        "feedback": [dict(row) for row in rows],
    })



# ---------------------------------------------------------
# ERROR HANDLERS
# ---------------------------------------------------------

@app.errorhandler(413)
def file_too_large(_error):
    return jsonify({
        "success": False,
        "error": "File too large. Maximum upload size is 10 MB."
    }), 413


@app.errorhandler(404)
def page_not_found(_error):
    if request.path.startswith("/api/"):
        return error_response("API endpoint not found.", 404)
    return "Page not found.", 404


@app.errorhandler(500)
def internal_error(_error):
    app.logger.exception("Unexpected server error")
    if request.path.startswith("/api/"):
        return error_response("An unexpected server error occurred.", 500)
    return "An unexpected server error occurred.", 500


# ---------------------------------------------------------
# START APPLICATION
# ---------------------------------------------------------

if __name__ == "__main__":
    # debug=True is for local development only.
    app.run(
        host="127.0.0.1",
        port=int(os.getenv("PORT", "5000")),
        debug=os.getenv("FLASK_DEBUG", "false").lower() == "true",
    )
