import os
import requests
from datetime import datetime, timedelta

GITHUB_API_URL = "https://api.github.com"
REPO = os.getenv("REPO")
TOKEN = os.getenv("GITHUB_TOKEN")
DAYS_THRESHOLD = int(os.getenv("DAYS_THRESHOLD", "30"))

def get_deployments():
    url = f"{GITHUB_API_URL}/repos/{REPO}/deployments"
    headers = {
        "Authorization": f"token {TOKEN}",
        "Accept": "application/vnd.github.v3+json",
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def delete_deployment(deployment_id):
    url = f"{GITHUB_API_URL}/repos/{REPO}/deployments/{deployment_id}"
    headers = {
        "Authorization": f"token {TOKEN}",
        "Accept": "application/vnd.github.v3+json",
    }
    response = requests.delete(url, headers=headers)
    response.raise_for_status()

def main():
    deployments = get_deployments()
    cutoff_date = datetime.utcnow() - timedelta(days=DAYS_THRESHOLD)
    
    for deployment in deployments:
        created_at = datetime.strptime(deployment["created_at"], "%Y-%m-%dT%H:%M:%SZ")
        if created_at < cutoff_date:
            print(f"Deleting deployment {deployment['id']} created on {created_at}")
            delete_deployment(deployment["id"])

if __name__ == "__main__":
    main()