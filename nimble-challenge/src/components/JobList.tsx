import { useEffect, useState } from "react";
import { getAvailableJobs } from "../api/nimbleApi";
import type { Job } from "../types/Job";
import type { Candidate } from "../types/Candidate";
import JobItem from "./JobItem";
import Loading from "./Loading";

interface JobListProps {
    candidate: Candidate;
}
const JobList = ({ candidate }: JobListProps) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getAvailableJobs();
                setJobs(data);
            } catch (err) {
                setError("Failed to load jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          candidate={candidate}
        />
      ))}
    </div>
  );
};

export default JobList;
