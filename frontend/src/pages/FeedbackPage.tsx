import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import logo from '../assets/images/logo_protector_no.svg';
import userIcon from '../assets/images/user.png'

interface Feedback {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export default function FeedbackPage() {
    const { data: feedbackData, refetch } = useQuery<Feedback[]>({
        queryFn: async () => {
            const result = await fetch('http://localhost:3000/api/feedback');
            const json = await result.json();
            return json.data;
        },
        queryKey: ['feedback'],
        refetchOnWindowFocus: false
    });

    const [feedbackForm, setFeedbackForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        isPending: false,
        isSubmitted: false,
    });

    // Handles input changes in form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFeedbackForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handles form submission
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

            // Manually refetch feedback data list
            refetch()

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
        document.title = "Tilbakemelding - Protector Forsikring"
    }, []);

    return (
        <>
            <Header />
            <main>{ }
                <h1 className='headline'>Tilbakemelding</h1>
                <div className='feedbackForm'>
                    {!feedbackForm.isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Navn:</label>
                            <input
                                name="name"
                                type="text"
                                value={feedbackForm.name}
                                onChange={handleChange}
                                maxLength={255}
                                required
                                placeholder="Ditt fulle navn"
                            />

                            <label htmlFor="email">Epost:</label>
                            <input
                                name="email"
                                type="email"
                                value={feedbackForm.email}
                                onChange={handleChange}
                                maxLength={255}
                                required
                                placeholder="Din epost adresse"
                            />

                            <label htmlFor="subject">Emne:</label>
                            <input
                                name="subject"
                                type="text"
                                value={feedbackForm.subject}
                                onChange={handleChange}
                                maxLength={255}
                                required
                                placeholder="Tittel på tilbakemelding"
                            />

                            <label htmlFor="message">Melding:</label>
                            <textarea
                                name="message"
                                value={feedbackForm.message}
                                onChange={handleChange}
                                rows={5}
                                required
                            />

                            {feedbackForm.isPending && <p>Takk for din tilbakemelding, din innsending er i ferd med å behandles!</p>}

                            <button type="submit" disabled={feedbackForm.isPending}>
                                {feedbackForm.isPending ? 'Sender...' : 'Send'}
                            </button>
                        </form>
                    ) : (
                        <div className='submitted'>
                            Takk for din tilbakemelding!
                            <img src={logo} alt="logo_protector_no" />
                        </div>
                    )}

                </div>
                <div className='feedbackList'>
                    <h2>Våre Tilbakemeldinger ({feedbackData?.length ?? 0}):</h2>
                    <ul>
                        {feedbackData
                            ?.sort(
                                (a, b) =>
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                            )
                            .map((feedback: Feedback) => {
                                return (
                                    <li key={feedback.id}>
                                        <div className="top">
                                            <img src={userIcon} />
                                            <div>
                                                <h3>{feedback.subject}</h3>
                                                <span title={new Date(feedback.created_at).toLocaleTimeString()}>
                                                    {new Date(feedback.created_at).toLocaleDateString()} - {feedback.name}
                                                </span>
                                            </div>
                                        </div>
                                        <p>
                                            {feedback.message.split("\n").map((line, index) => (
                                                <span key={index}>{line}<br /></span>
                                            ))}
                                        </p>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </main>
        </>
    )
}