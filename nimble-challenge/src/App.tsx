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

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-left">
          <img src="/nimblegravity_latam_logo.jpg" alt="Nimble Gravity" />
          <small>Nimble Challenge · React</small>
        </div>
      </div>

      <div className="welcome">Welcome, {candidate.firstName}!</div>
      <h2 className="section-title">Available positions</h2>

      <JobList candidate={candidate} />
    </div>
  );
}

export default App;