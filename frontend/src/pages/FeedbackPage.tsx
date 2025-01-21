import { useState, useEffect } from 'react'
import Header from '../components/Header';

export default function FeedbackPage() {
    const [feedbackForm, setFeedbackForm] = useState({
        name: "Mikael Holand",
        email: "mikael.holand@gmail.com",
        subject: "Test",
        message: "Hello World",
        isPending: false,
        isSubmitted: false,
    });
    const [feedbackList, setFeedbackList] = useState<any[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFeedbackForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFeedbackForm((prev) => ({
            ...prev,
            isPending: true,
        }));

        try {
            const response = await fetch('http://localhost:3000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: feedbackForm.name,
                    email: feedbackForm.email,
                    subject: feedbackForm.subject,
                    message: feedbackForm.message,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            setFeedbackForm({
                name: "",
                email: "",
                subject: "",
                message: "",
                isPending: false,
                isSubmitted: true,
            });
        } catch (error) {
            console.error(error);
            setFeedbackForm((prev) => ({
                ...prev,
                isPending: false,
            }));
        }
    };

    useEffect(() => {
        document.title = "Feedback - Protector Forsikring"
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/feedback')
            .then((res) => res.json())
            .then((data) => {
                console.log("Feedback data:", data);  // Inspecting structure
                if (Array.isArray(data.data)) {
                    setFeedbackList(data.data);  // Accessing the data property
                } else {
                    console.error("Expected an array in 'data' but got:", data);
                    setFeedbackList([]);  // Fallback to empty array
                }
            })
            .catch((error) => {
                console.error('Error fetching feedback:', error);
                setFeedbackList([]);  // Handle error gracefully, reset to empty
            });
    }, []);



    return (
        <>
            <Header />
            <main>
                <h1>Tilbakemelding</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Navn:</label>
                    <input
                        name="name"
                        type="text"
                        value={feedbackForm.name}
                        onChange={handleChange}
                        maxLength={255}
                        required
                    />

                    <label htmlFor="email">Epost:</label>
                    <input
                        name="email"
                        type="text"
                        value={feedbackForm.email}
                        onChange={handleChange}
                        maxLength={255}
                        required
                    />

                    <label htmlFor="subject">Emne:</label>
                    <input
                        name="subject"
                        type="text"
                        value={feedbackForm.subject}
                        onChange={handleChange}
                        maxLength={255}
                        required
                    />

                    <label htmlFor="message">Melding:</label>
                    <textarea
                        name="message"
                        value={feedbackForm.message}
                        onChange={handleChange}
                        rows={5}
                        required
                    />

                    <button type='submit'>Send</button>
                </form>
                <div>
                    <ul>
                        {feedbackList.map((feedback) => (
                            <li key={feedback.id}>
                                <h3>{feedback.subject}</h3>
                                <p>{feedback.name} - {feedback.email}</p>
                                <p>{feedback.message}</p>
                                <p>Submitted: {new Date(feedback.created_at).toDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}