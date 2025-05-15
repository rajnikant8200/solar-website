import React from "react";
import './WorkingProcess.css';
import { FaClipboardList, FaSearch, FaSolarPanel, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardList size={40} />,
    title: "Project Planning",
    description: "We assess your energy needs, design custom solar solution, and manage installation for optimal efficiency."
  },
  {
    icon: <FaSearch size={40} />,
    title: "Research & Analysis",
    description: "We conduct in-depth research and analysis to design efficient solar solutions tailored to your needs."
  },
  {
    icon: <FaSolarPanel size={40} />,
    title: "Solar Installation",
    description: "Professional solar installation with precision & care, ensuring optimal performance & long-term energy savings."
  },
  {
    icon: <FaCheckCircle size={40} />,
    title: "Ready To Use",
    description: "Grid tariffs increase by 3–5% annually, driving up electricity costs. Switch to solar and secure long-term savings!"
  }
];

const WorkingProcess = () => {
  return (
    <section className="working-process-section">
      <div className="heading">
        <h2>OUR PROCESS</h2>
        <h1>Working Process for Services</h1>
        <p>
          Our streamlined process ensures seamless service from consultation to installation.
          We design, install, and maintain your solar solution with care.
        </p>
      </div>

      <div className="working-process-row">
        {steps.map((step, index) => (
          <div key={index} className="working-process-item">
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkingProcess;
