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
    if response.status_code == 204:
        print(f"Successfully deleted deployment {deployment_id}")
    else:
        print(f"Failed to delete deployment {deployment_id}: {response.status_code} {response.text}")
        response.raise_for_status()

def main():
    deployments = get_deployments()
    # Keep only the most recent deployment, delete the rest
    if len(deployments) > 1:
        for deployment in deployments[1:]:
            print(f"Deleting deployment {deployment['id']} created on {deployment['created_at']}")
            try:
                delete_deployment(deployment["id"])
            except requests.exceptions.HTTPError as e:
                print(f"Error deleting deployment {deployment['id']}: {e}")

if __name__ == "__main__":
    main()