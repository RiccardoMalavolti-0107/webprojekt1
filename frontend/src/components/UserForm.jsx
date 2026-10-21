import { useState } from "react";
import axios from "axios";
import "./UserForm.css";

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    role: "developer",
    newsletter: false,
};

export default function UserForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, type, checked, value, valueAsNumber } = event.target;
        const nextValue = type === "checkbox" ? checked : type === "number" && value !== "" ? valueAsNumber : value;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: nextValue,
        }));
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError("A vezetéknév és a keresztnév megadása kötelező.");
            setSuccess("");
            return;
        }

        if (!formData.email.trim() || !formData.email.includes("@")) {
            setError("Adj meg egy érvényes, @ jelet tartalmazó e-mail címet.");
            setSuccess("");
            return;
        }

        if (formData.age !== "" && (!Number.isFinite(formData.age) || formData.age <= 0)) {
            setError("Az életkornak 0-nál nagyobb számnak kell lennie.");
            setSuccess("");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            await axios.post("http://localhost:3000/users", {
                ...formData,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                age: formData.age === "" ? null : formData.age,
            });
            setSuccess("Az adatok beküldése sikerült.");
        } catch (requestError) {
            console.error("A felhasználói adatok beküldése sikertelen:", requestError);
            setError("Az adatok beküldése nem sikerült. Ellenőrizd, hogy a backend fut-e.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="user-form">
            <h2>Felhasználói adatlap</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="user-form__field">
                    <label htmlFor="firstName">Vezetéknév *</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="lastName">Keresztnév *</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="email">E-mail cím *</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="age">Életkor</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        min="0"
                        step="any"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="role">Szerepkör</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange}>
                        <option value="developer">Fejlesztő</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Projektmenedzser</option>
                    </select>
                </div>

                <label className="user-form__checkbox" htmlFor="newsletter">
                    <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={handleChange}
                    />
                    Hírlevél feliratkozás
                </label>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Beküldés..." : "Adatok beküldése"}
                </button>

                {isLoading && (
                    <p className="user-form__status" role="status">
                        Az adatok küldése folyamatban...
                    </p>
                )}
                {error && (
                    <p className="user-form__error" role="alert">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="user-form__success" role="status">
                        {success}
                    </p>
                )}
            </form>
        </section>
    );
}
