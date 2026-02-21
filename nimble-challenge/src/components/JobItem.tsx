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

  const handleSubmit = async () => {
    if (!repoUrl) {
      alert("Please enter the repository URL");
      return;
    }

    try {
      setLoading(true);
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl,
      });
      alert("Application sent successfully!");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>{job.title}</h3>
      <input
        type="text"
        placeholder="Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>
    </div>
  );
}
export default JobItem;
