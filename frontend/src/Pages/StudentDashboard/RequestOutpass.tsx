
import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import styles from '../../components/Css/TileView.module.css';
import formStyles from '../../components/Css/ManualAllocation.module.css';

const OutpassReq: React.FC = () => {
  const [formData, setFormData] = useState({
    placeOfVisit: "",
    reasonForVisit: "",
    leaveDate: "",
    returnDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Outpass Request:", formData);
    // Perform any backend POST or state update here
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Sticky header like FindStudent */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "white",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
        padding: "20px",
        width: "100%"
      }}>
        <PageTitle text="Outpass Request" />
      </div>

      {/* Tile-like container */}
      <div className={styles.tileView}>
        <form className={formStyles.form} onSubmit={handleSubmit}>
          <div className={formStyles.formHeader}>
            <h2 className={formStyles.formTitle}>Request Form</h2>
          </div>

          <section className={formStyles.formFields}>
            <div className={formStyles.fieldWrapper}>
              <label className={formStyles.fieldLabel}>Place of Visit</label>
              <input
                type="text"
                name="placeOfVisit"
                value={formData.placeOfVisit}
                onChange={handleChange}
                className={formStyles.inputField}
                required
              />
            </div>

            <div className={formStyles.fieldWrapper}>
              <label className={formStyles.fieldLabel}>Reason for Visit</label>
              <textarea
                name="reasonForVisit"
                value={formData.reasonForVisit}
                onChange={handleChange}
                className={formStyles.inputField}
                required
              />
            </div>

            <div className={formStyles.fieldWrapper}>
              <label className={formStyles.fieldLabel}>Leave Date</label>
              <input
                type="date"
                name="leaveDate"
                value={formData.leaveDate}
                onChange={handleChange}
                className={formStyles.inputField}
                required
              />
            </div>

            <div className={formStyles.fieldWrapper}>
              <label className={formStyles.fieldLabel}>Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className={formStyles.inputField}
                required
              />
            </div>
          </section>

          <footer className={formStyles.formActions}>
            <button type="submit" className={`${formStyles.actionButton} ${formStyles.successButton}`}>
              <span className={formStyles.buttonText}>Submit</span>
              <img src="/submit.svg" alt="Submit" className={formStyles.buttonIcon} />
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default OutpassReq;
