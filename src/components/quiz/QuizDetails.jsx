import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaPrint } from "react-icons/fa";
import he from "he";
import html2pdf from "html2pdf.js";
import logoUrl from "../assets/logo-png1.png";

export default function QuizDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const print = useRef();

    useEffect(() => {
        const historyDetails = JSON.parse(localStorage.getItem("history")) || [];           // Fetching quiz history from local storage
        const currentDetails = historyDetails.find(item => item.id === parseInt(id)) || {};  // Filtering the matching quiz
        setDetails(currentDetails);                                                    // Updating displayable quiz
    }, [id]);

    // Function for printing quiz details
    function handlePrint() {
        const newDocument = document.createElement("div");

        const wrapper = document.createElement("div");   // A wrapper div with fixed width of 520px
        wrapper.innerHTML = `<img src="${logoUrl}" alt="Logo" style="width: 80px; height:60px; margin-bottom: 10px; border-radius: 50%; margin: 0 auto" />`
        wrapper.style.width = '520px';
        wrapper.style.margin = '0 auto';
        wrapper.style.padding = "1px"

        wrapper.appendChild(print.current.cloneNode(true));  // Appending the current print ref content to the wrapper

        newDocument.appendChild(wrapper);                    // Appending the wrapper to the newDocument
        document.body.appendChild(newDocument);              // Appending the newDocument into the body

        // Setting options for the printed PDF file
        const options = {
            margin: 1,
            filename: 'quiz-results.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf()
            .from(newDocument)
            .set(options)
            .save()
            .then(() => {
                document.body.removeChild(newDocument); // Clean up newDocument after saving
            })
            .catch(error => {
                console.error("Error generating PDF", error);
            });
    }

    return (
        <div className="max-w-4xl mx-auto my-2">
            <div className="flex items-center justify-between">
                <Link
                    to="/history"
                >
                    <button className='flex items-center justify-center text-sm font-semibold text-cyan-600 hover:underline hover:text-cyan-300 transition duration-300 ease-in-out p-2 rounded hover:bg-cyan-800'>

                        <FaAngleDoubleLeft className='mr-1' />
                        Back
                    </button>
                </Link>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 cursor-pointer bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out text-sm p-1 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <FaPrint />
                    Print
                </button>

            </div>
            <div
                ref={print}
                style={{
                    backgroundColor: '#2d3748', // bg-gray-800
                    color: '#e2e8f0', // text-gray-200
                }}
                className="mt-5 max-sm:p-2 p-4 border rounded shadow-md"
            >
                {Object.keys(details).length === 0 ? (
                    <p className="text-center text-red-500">Sorry! No matching details</p>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">{he.decode(details.topic)}</h2>
                        <p><strong>Level:</strong> {details.level}</p>
                        <p><strong>Correct Answers:</strong> {details.correct} out of {details.questions}</p>
                        <p><strong>Score:</strong> {details.scored}%</p>
                        <p><strong>Time Spent:</strong> {details.spent}</p>
                        <p><strong>Date:</strong> {details.date}</p>

                        <h3 className="mt-5 text-xl font-semibold">Questions:</h3>
                        <div className="mt-2">
                            {details.details.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ backgroundColor: '#4a5568' }} /* bg-gray-700 */
                                    className="mb-4 max-sm:p-2 p-3 border rounded">
                                    <p className="font-medium">{index + 1}. {item.question && he.decode(item.question)}</p>
                                    <p className="mt-1"><strong>Your Answer:</strong> {item.choosed && he.decode(item.choosed)}
                                        {item.choosed === item.correct ? (
                                            <span
                                                style={{ color: '#48bb78' }} /* className="text-green-400" */
                                            > (Correct)</span>
                                        ) : (
                                            <span
                                                style={{ color: '#f56565' }} /*  className="text-red-400" */
                                            > (Incorrect)</span>
                                        )}
                                    </p>
                                    <p className="mt-2"><strong>Options:</strong></p>
                                    <ul className="list-disc list-inside">
                                        {item.options.map((option, idx) => (
                                            <li
                                                key={idx}
                                                style={{
                                                    color: option === item.correct ? '#68d391' : '#e2e8f0' // text-green-300 or text-gray-300
                                                }}
                                                className="p-1">
                                                {he.decode(option)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
