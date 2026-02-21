import { useState } from "react";
import { applyToJob } from "../api/nimbleApi";
import type { Job } from "../types/Job";
import type { Candidate } from "../types/Candidate";

interface JobItemProps {
    job: Job;
    candidate: Candidate;
}
const JobItem = ({ job, candidate }: JobItemProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!repoUrl) {
      setError("Please enter the repository URL");
      return;
    }
    setError(null);

    try {
      setLoading(true);
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl,
      });
      setSubmitted(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <div className="job-form">
        <input
          type="text"
          placeholder="GitHub repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading || submitted}>
          {loading ? "Submitting..." : submitted ? "Submitted" : "Submit"}
        </button>
        {error && <span className="status error-inline">{error}</span>}
        {submitted && (
          <span className="status success-inline">Application received</span>
        )}
      </div>
    </div>
  );
}

export default JobItem;
