import { useState } from "react";
import { api } from "../services/api";
import "./ContactForm.css";

function ContactForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name) return setError("Name is required");
    if (!isValidPhone(form.phone)) return setError("Phone must be 10 digits");
    if (form.email && !isValidEmail(form.email))
      return setError("Invalid email format");

    await api.post("/contacts", form);

    setForm({ name: "", email: "", phone: "", message: "" });
    setSuccess("Contact saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
    refresh();
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Add New Contact</h2>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <form onSubmit={submitHandler} className="contact-form">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="6"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <button className="submit-btn" type="submit">
          Save Contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
