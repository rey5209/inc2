import os
import requests

GITHUB_API_URL = "https://api.github.com"
REPO = os.getenv("REPO")
TOKEN = os.getenv("GITHUB_TOKEN")

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
    # Keep only the most recent deployment, delete the rest
    if len(deployments) > 1:
        for deployment in deployments[1:]:
            print(f"Deleting deployment {deployment['id']} created on {deployment['created_at']}")
            delete_deployment(deployment["id"])

if __name__ == "__main__":
    main()