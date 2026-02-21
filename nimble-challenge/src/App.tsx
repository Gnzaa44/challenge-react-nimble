import { useEffect, useState } from "react";
import { getCandidateByEmail } from "./api/nimbleApi";
import type { Candidate } from "./types/Candidate";
import JobList from "./components/JobList";
import Loading from "./components/Loading";

const EMAIL = "gonzaseitz@gmail.com";

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateByEmail(EMAIL);
        setCandidate(data);
      } catch (error) {
        alert("Error fetching candidate data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, []);

  if (loading) return <Loading />;
  if (!candidate) return <p>Error</p>;

  return <JobList candidate={candidate} />;
}

export default App;