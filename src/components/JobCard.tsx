interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
  }
  
  interface Props {
    job: Job;
    onClick?: () => void;
  }
  
  export default function JobCard({ job, onClick }: Props) {
    return (
      <div
        onClick={onClick}
        className="border p-4 rounded shadow-sm hover:shadow cursor-pointer"
      >
        <h4 className="font-bold text-blue-600">{job.title}</h4>
        <p className="text-sm text-gray-700">{job.company} – {job.location}</p>
        <p className="text-sm text-gray-500 mt-1">{job.type} | {job.salary}</p>
      </div>
    );
  }
  