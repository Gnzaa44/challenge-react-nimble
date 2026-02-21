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
    { uuid: string; jobId: string; candidateId: string; applicationId: string; repoUrl: string }) => {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        let errBody: any = null;
        try {
            errBody = await response.json();
        } catch (e) {
            try {
                errBody = await response.text();
            } catch (e2) {
                errBody = null;
            }
        }
        const message = errBody && typeof errBody === 'object' ? (errBody.message || JSON.stringify(errBody)) : (errBody || response.statusText);
        throw new Error(message || `Error applying to job: ${response.status}`);
    }
    return response.json();
}