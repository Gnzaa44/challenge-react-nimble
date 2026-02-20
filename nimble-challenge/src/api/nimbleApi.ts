const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net"

export const getCandidateByEmail = async (email: string) => {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
    if (!response.ok) {
        throw new Error(`Error fetching candidate by email: ${response.statusText}`);
    }
    return response.json();
}

export const getAvailableJobs = async () => {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) {
        throw new Error(`Error fetching available jobs: ${response.statusText}`);
    }
    return response.json();
}

export const applyToJob = async (payload: 
    { uuid: string; jobId: string; candidateId: string; repoUrl: string }) => {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error applying to job");
    }
    return response.json();
}