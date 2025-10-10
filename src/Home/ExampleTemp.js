import React, { useState, useRef } from 'react';
import { Download, Plus, Edit3, Trash2, User, Mail, Phone, Briefcase, GraduationCap, Award, Code, Star } from 'lucide-react';

const ATSCVBuilder = () => {
    const [cvs, setCVs] = useState([]);
    const [currentCV, setCurrentCV] = useState(null);
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const printRef = useRef();

    const [formData, setFormData] = useState({
        personal: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            portfolio: '',
            summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: []
    });

    const handleInputChange = (section, field, value, index = null) => {
        setFormData(prev => {
            if (index !== null) {
                const newArray = [...prev[section]];
                newArray[index] = { ...newArray[index], [field]: value };
                return { ...prev, [section]: newArray };
            } else {
                return {
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: value
                    }
                };
            }
        });
    };

    const addItem = (section) => {
        const templates = {
            experience: {
                title: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            },
            education: {
                degree: '',
                institution: '',
                location: '',
                graduationDate: '',
                gpa: ''
            },
            skills: {
                category: '',
                items: ''
            },
            projects: {
                name: '',
                technologies: '',
                description: '',
                link: ''
            },
            certifications: {
                name: '',
                issuer: '',
                date: '',
                id: ''
            }
        };

        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], templates[section]]
        }));
    };

    const removeItem = (section, index) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const saveCV = () => {
        const cvData = {
            id: currentCV || Date.now(),
            name: formData.personal.fullName || 'Untitled CV',
            createdAt: new Date().toISOString(),
            data: formData
        };

        setCVs(prev => {
            const existing = prev.findIndex(cv => cv.id === cvData.id);
            if (existing >= 0) {
                const updated = [...prev];
                updated[existing] = cvData;
                return updated;
            } else {
                return [...prev, cvData];
            }
        });

        setCurrentCV(cvData.id);
        setIsEditing(false);
    };

    const loadCV = (cv) => {
        setFormData(cv.data);
        setCurrentCV(cv.id);
        setIsEditing(true);
    };

    const deleteCV = (id) => {
        setCVs(prev => prev.filter(cv => cv.id !== id));
        if (currentCV === id) {
            setCurrentCV(null);
            setFormData({
                personal: {
                    fullName: '',
                    email: '',
                    phone: '',
                    location: '',
                    linkedin: '',
                    portfolio: '',
                    summary: ''
                },
                experience: [],
                education: [],
                skills: [],
                projects: [],
                certifications: []
            });
        }
    };

    const downloadCV = () => {
        const element = printRef.current;
        // Simple download as HTML for now (in real implementation, you'd use html2pdf)
        const htmlContent = element.innerHTML;
        const blob = new Blob([`
    <!DOCTYPE html>
    <html>
    <head>
        <title>${formData.personal.fullName} - CV</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; background: #f4f6fa; }
            .cv-main { display: flex; max-width: 900px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 16px #0001; overflow: hidden; }
            .cv-sidebar { background: #232946; color: #fff; width: 260px; padding: 32px 24px; display: flex; flex-direction: column; align-items: flex-start; }
            .cv-sidebar h1 { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
            .cv-sidebar .cv-contact { font-size: 0.97rem; margin-bottom: 18px; }
            .cv-sidebar .cv-contact div { margin-bottom: 7px; display: flex; align-items: center; gap: 7px; }
            .cv-sidebar .cv-links a { color: #eebbc3; text-decoration: none; font-size: 0.97rem; display: block; margin-bottom: 7px; }
            .cv-sidebar .cv-summary { margin-top: 18px; font-size: 1rem; opacity: 0.9; }
            .cv-content { flex: 1; padding: 32px 36px; }
            .cv-section { margin-bottom: 28px; }
            .cv-section-title { font-size: 1.15rem; font-weight: 600; color: #232946; border-bottom: 2px solid #eebbc3; padding-bottom: 4px; margin-bottom: 13px; letter-spacing: 0.5px; }
            .cv-item { margin-bottom: 18px; }
            .cv-item-title { font-weight: 600; font-size: 1.05rem; color: #232946; }
            .cv-item-subtitle { color: #393e46; font-size: 0.98rem; }
            .cv-item-meta { font-size: 0.93rem; color: #888; margin-bottom: 2px; }
            .cv-item-desc { margin-top: 3px; font-size: 0.97rem; color: #222; }
            .cv-skill-list { margin-top: 3px; font-size: 0.97rem; color: #232946; }
            .cv-project-link a { color: #3b82f6; text-decoration: underline; font-size: 0.97rem; }
        </style>
    </head>
    <body>
        <div class="cv-main">
            <div class="cv-sidebar">
                <h1>${formData.personal.fullName || ''}</h1>
                <div class="cv-contact">
                    ${formData.personal.email ? `<div>${formData.personal.email}</div>` : ''}
                    ${formData.personal.phone ? `<div>${formData.personal.phone}</div>` : ''}
                    ${formData.personal.location ? `<div>${formData.personal.location}</div>` : ''}
                </div>
                <div class="cv-links">
                    ${formData.personal.linkedin ? `<a href="${formData.personal.linkedin}" target="_blank">LinkedIn</a>` : ''}
                    ${formData.personal.portfolio ? `<a href="${formData.personal.portfolio}" target="_blank">Portfolio</a>` : ''}
                </div>
                ${formData.personal.summary ? `<div class="cv-summary">${formData.personal.summary}</div>` : ''}
            </div>
            <div class="cv-content">
                ${formData.experience.length > 0 ? `
                    <div class="cv-section">
                        <div class="cv-section-title">Experience</div>
                        ${formData.experience.map(exp => `
                            <div class="cv-item">
                                <div class="cv-item-title">${exp.title || ''}${exp.company ? ` <span class="cv-item-subtitle">@ ${exp.company}</span>` : ''}</div>
                                <div class="cv-item-meta">
                                    ${exp.location ? `<span>${exp.location}</span>` : ''}
                                    ${(exp.startDate || exp.endDate || exp.current) ? `<span> | ${exp.startDate || ''}${exp.startDate && (exp.endDate || exp.current) ? ' - ' : ''}${exp.current ? 'Present' : exp.endDate || ''}</span>` : ''}
                                </div>
                                ${exp.description ? `<div class="cv-item-desc">${exp.description}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${formData.education.length > 0 ? `
                    <div class="cv-section">
                        <div class="cv-section-title">Education</div>
                        ${formData.education.map(edu => `
                            <div class="cv-item">
                                <div class="cv-item-title">${edu.degree || ''}${edu.institution ? ` <span class="cv-item-subtitle">@ ${edu.institution}</span>` : ''}</div>
                                <div class="cv-item-meta">
                                    ${edu.location ? `<span>${edu.location}</span>` : ''}
                                    ${edu.graduationDate ? `<span> | ${edu.graduationDate}</span>` : ''}
                                    ${edu.gpa ? `<span> | GPA: ${edu.gpa}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${formData.skills.length > 0 ? `
                    <div class="cv-section">
                        <div class="cv-section-title">Skills</div>
                        ${formData.skills.map(skill => `
                            <div class="cv-item">
                                <div class="cv-item-title">${skill.category || ''}</div>
                                <div class="cv-skill-list">${skill.items || ''}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${formData.projects.length > 0 ? `
                    <div class="cv-section">
                        <div class="cv-section-title">Projects</div>
                        ${formData.projects.map(project => `
                            <div class="cv-item">
                                <div class="cv-item-title">${project.name || ''}</div>
                                <div class="cv-item-meta">${project.technologies || ''}</div>
                                <div class="cv-item-desc">${project.description || ''}</div>
                                ${project.link ? `<div class="cv-project-link"><a href="${project.link}" target="_blank">${project.link}</a></div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${formData.certifications.length > 0 ? `
                    <div class="cv-section">
                        <div class="cv-section-title">Certifications</div>
                        ${formData.certifications.map(cert => `
                            <div class="cv-item">
                                <div class="cv-item-title">${cert.name || ''}</div>
                                <div class="cv-item-meta">
                                    ${cert.issuer ? `<span>${cert.issuer}</span>` : ''}
                                    ${cert.date ? `<span> | ${cert.date}</span>` : ''}
                                    ${cert.id ? `<span> | ID: ${cert.id}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    </body>
    </html>
`], { type: 'text/html' });


        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.personal.fullName || 'CV'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const newCV = () => {
        setFormData({
            personal: {
                fullName: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                portfolio: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: []
        });
        setCurrentCV(null);
        setIsEditing(true);
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
        >
            <Icon size={16} />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold">ATS-Friendly CV Builder</h1>
                            <div className="flex gap-3">
                                <button
                                    onClick={newCV}
                                    className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <Plus size={16} />
                                    New CV
                                </button>
                                {formData.personal.fullName && (
                                    <button
                                        onClick={downloadCV}
                                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        <Download size={16} />
                                        Download
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        {/* Sidebar - CV List */}
                        <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">My CVs</h2>
                            <div className="space-y-2">
                                {cvs.map(cv => (
                                    <div key={cv.id} className="bg-white rounded-lg p-3 border border-gray-200">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800 truncate">{cv.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(cv.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => loadCV(cv)}
                                                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => deleteCV(cv.id)}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {cvs.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        <p>No CVs created yet</p>
                                        <p className="text-sm">Click "New CV" to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex">
                            {/* Form Section */}
                            <div className="w-1/2 p-6">
                                {isEditing ? (
                                    <>
                                        {/* Tab Navigation */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <TabButton id="personal" label="Personal" icon={User} />
                                            <TabButton id="experience" label="Experience" icon={Briefcase} />
                                            <TabButton id="education" label="Education" icon={GraduationCap} />
                                            <TabButton id="skills" label="Skills" icon={Code} />
                                            <TabButton id="projects" label="Projects" icon={Star} />
                                            <TabButton id="certifications" label="Certifications" icon={Award} />
                                        </div>

                                        {/* Personal Information */}
                                        {activeTab === 'personal' && (
                                            <div className="space-y-4">
                                                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={formData.personal.fullName}
                                                        onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="Email Address"
                                                        value={formData.personal.email}
                                                        onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone Number"
                                                        value={formData.personal.phone}
                                                        onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Location (City, Country)"
                                                        value={formData.personal.location}
                                                        onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                        type="url"
                                                        placeholder="LinkedIn Profile"
                                                        value={formData.personal.linkedin}
                                                        onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                        type="url"
                                                        placeholder="Portfolio/Website"
                                                        value={formData.personal.portfolio}
                                                        onChange={(e) => handleInputChange('personal', 'portfolio', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <textarea
                                                        placeholder="Professional Summary"
                                                        value={formData.personal.summary}
                                                        onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                                                        rows="4"
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Experience */}
                                        {activeTab === 'experience' && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                                                    <button
                                                        onClick={() => addItem('experience')}
                                                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                                                    >
                                                        <Plus size={16} />
                                                        Add Experience
                                                    </button>
                                                </div>
                                                {formData.experience.map((exp, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="font-medium">Experience {index + 1}</h3>
                                                            <button
                                                                onClick={() => removeItem('experience', index)}
                                                                className="text-red-600 hover:bg-red-100 p-1 rounded"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Job Title"
                                                                value={exp.title}
                                                                onChange={(e) => handleInputChange('experience', 'title', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Company Name"
                                                                value={exp.company}
                                                                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Location"
                                                                value={exp.location}
                                                                onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <input
                                                                    type="month"
                                                                    placeholder="Start Date"
                                                                    value={exp.startDate}
                                                                    onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                                />
                                                                <input
                                                                    type="month"
                                                                    placeholder="End Date"
                                                                    value={exp.endDate}
                                                                    onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                                                                    disabled={exp.current}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                                                                />
                                                            </div>
                                                            <label className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={exp.current}
                                                                    onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                                                                    className="rounded"
                                                                />
                                                                Currently working here
                                                            </label>
                                                            <textarea
                                                                placeholder="Job Description & Achievements"
                                                                value={exp.description}
                                                                onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                                                                rows="3"
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Education */}
                                        {activeTab === 'education' && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                                                    <button
                                                        onClick={() => addItem('education')}
                                                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                                                    >
                                                        <Plus size={16} />
                                                        Add Education
                                                    </button>
                                                </div>
                                                {formData.education.map((edu, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="font-medium">Education {index + 1}</h3>
                                                            <button
                                                                onClick={() => removeItem('education', index)}
                                                                className="text-red-600 hover:bg-red-100 p-1 rounded"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Degree/Qualification"
                                                                value={edu.degree}
                                                                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Institution Name"
                                                                value={edu.institution}
                                                                onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Location"
                                                                value={edu.location}
                                                                onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="month"
                                                                placeholder="Graduation Date"
                                                                value={edu.graduationDate}
                                                                onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="GPA (optional)"
                                                                value={edu.gpa}
                                                                onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Skills */}
                                        {activeTab === 'skills' && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                                                    <button
                                                        onClick={() => addItem('skills')}
                                                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                                                    >
                                                        <Plus size={16} />
                                                        Add Skill Category
                                                    </button>
                                                </div>
                                                {formData.skills.map((skill, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="font-medium">Skill Category {index + 1}</h3>
                                                            <button
                                                                onClick={() => removeItem('skills', index)}
                                                                className="text-red-600 hover:bg-red-100 p-1 rounded"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Category (e.g., Programming Languages)"
                                                                value={skill.category}
                                                                onChange={(e) => handleInputChange('skills', 'category', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Skills (comma-separated)"
                                                                value={skill.items}
                                                                onChange={(e) => handleInputChange('skills', 'items', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Projects */}
                                        {activeTab === 'projects' && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                                                    <button
                                                        onClick={() => addItem('projects')}
                                                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                                                    >
                                                        <Plus size={16} />
                                                        Add Project
                                                    </button>
                                                </div>
                                                {formData.projects.map((project, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="font-medium">Project {index + 1}</h3>
                                                            <button
                                                                onClick={() => removeItem('projects', index)}
                                                                className="text-red-600 hover:bg-red-100 p-1 rounded"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Project Name"
                                                                value={project.name}
                                                                onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Technologies Used"
                                                                value={project.technologies}
                                                                onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <textarea
                                                                placeholder="Project Description"
                                                                value={project.description}
                                                                onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                                                                rows="3"
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="url"
                                                                placeholder="Project Link (optional)"
                                                                value={project.link}
                                                                onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Certifications */}
                                        {activeTab === 'certifications' && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
                                                    <button
                                                        onClick={() => addItem('certifications')}
                                                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                                                    >
                                                        <Plus size={16} />
                                                        Add Certification
                                                    </button>
                                                </div>
                                                {formData.certifications.map((cert, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="font-medium">Certification {index + 1}</h3>
                                                            <button
                                                                onClick={() => removeItem('certifications', index)}
                                                                className="text-red-600 hover:bg-red-100 p-1 rounded"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Certification Name"
                                                                value={cert.name}
                                                                onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Issuing Organization"
                                                                value={cert.issuer}
                                                                onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="month"
                                                                placeholder="Issue Date"
                                                                value={cert.date}
                                                                onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Credential ID (optional)"
                                                                value={cert.id}
                                                                onChange={(e) => handleInputChange('certifications', 'id', e.target.value, index)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={saveCV}
                                                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                            >
                                                Save CV
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <Edit3 size={48} className="mx-auto" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready to Create Your CV?</h2>
                                        <p className="text-gray-600 mb-6">Build an ATS-friendly CV that gets you noticed by employers</p>
                                        <button
                                            onClick={newCV}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Start Building
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Preview Section */}
                            <div className="w-1/2 bg-gray-50 p-6 border-l border-gray-200">
                                <div className="sticky top-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-h-screen overflow-y-auto">
                                        <div ref={printRef} className="cv-container">
                                            {formData.personal.fullName ? (
                                                <>
                                                    {/* Header */}
                                                    <div className="header mb-6">
                                                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{formData.personal.fullName}</h1>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                            {formData.personal.email && (
                                                                <div className="flex items-center gap-1">
                                                                    <Mail size={14} />
                                                                    {formData.personal.email}
                                                                </div>
                                                            )}
                                                            {formData.personal.phone && (
                                                                <div className="flex items-center gap-1">
                                                                    <Phone size={14} />
                                                                    {formData.personal.phone}                                                                    <Phone size={14} />
                                                                    {formData.personal.phone}
                                                                </div>
                                                            )}
                                                            {formData.personal.location && (
                                                                <div className="flex items-center gap-1">
                                                                    <Briefcase size={14} />
                                                                    {formData.personal.location}
                                                                </div>
                                                            )}
                                                            {formData.personal.linkedin && (
                                                                <div className="flex items-center gap-1">
                                                                    <a href={formData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                                                                        LinkedIn
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {formData.personal.portfolio && (
                                                                <div className="flex items-center gap-1">
                                                                    <a href={formData.personal.portfolio} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                                                                        Portfolio
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {formData.personal.summary && (
                                                            <p className="mt-2 text-gray-700">{formData.personal.summary}</p>
                                                        )}
                                                    </div>
                                                    {/* Experience Section */}
                                                    {formData.experience.length > 0 && (
                                                        <div className="section">
                                                            <div className="section-title">Experience</div>
                                                            {formData.experience.map((exp, idx) => (
                                                                <div key={idx} className="item">
                                                                    <div className="item-title">{exp.title} {exp.company && <span className="item-subtitle">@ {exp.company}</span>}</div>
                                                                    <div className="flex gap-4 text-xs text-gray-500">
                                                                        {exp.location && <span>{exp.location}</span>}
                                                                        {(exp.startDate || exp.endDate || exp.current) && (
                                                                            <span className="item-date">
                                                                                {exp.startDate && `${exp.startDate}`}
                                                                                {exp.startDate && (exp.endDate || exp.current) && ' - '}
                                                                                {exp.current ? 'Present' : exp.endDate}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {exp.description && <div className="mt-1">{exp.description}</div>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Education Section */}
                                                    {formData.education.length > 0 && (
                                                        <div className="section">
                                                            <div className="section-title">Education</div>
                                                            {formData.education.map((edu, idx) => (
                                                                <div key={idx} className="item">
                                                                    <div className="item-title">{edu.degree} {edu.institution && <span className="item-subtitle">@ {edu.institution}</span>}</div>
                                                                    <div className="flex gap-4 text-xs text-gray-500">
                                                                        {edu.location && <span>{edu.location}</span>}
                                                                        {edu.graduationDate && <span className="item-date">{edu.graduationDate}</span>}
                                                                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Skills Section */}
                                                    {formData.skills.length > 0 && (
                                                        <div className="section">
                                                            <div className="section-title">Skills</div>
                                                            {formData.skills.map((skill, idx) => (
                                                                <div key={idx} className="item">
                                                                    <div className="item-title">{skill.category}</div>
                                                                    <div>{skill.items}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Projects Section */}
                                                    {formData.projects.length > 0 && (
                                                        <div className="section">
                                                            <div className="section-title">Projects</div>
                                                            {formData.projects.map((project, idx) => (
                                                                <div key={idx} className="item">
                                                                    <div className="item-title">{project.name}</div>
                                                                    <div className="text-xs text-gray-500">{project.technologies}</div>
                                                                    <div>{project.description}</div>
                                                                    {project.link && (
                                                                        <div>
                                                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                                                                                {project.link}
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Certifications Section */}
                                                    {formData.certifications.length > 0 && (
                                                        <div className="section">
                                                            <div className="section-title">Certifications</div>
                                                            {formData.certifications.map((cert, idx) => (
                                                                <div key={idx} className="item">
                                                                    <div className="item-title">{cert.name}</div>
                                                                    <div className="flex gap-4 text-xs text-gray-500">
                                                                        {cert.issuer && <span>{cert.issuer}</span>}
                                                                        {cert.date && <span className="item-date">{cert.date}</span>}
                                                                        {cert.id && <span>ID: {cert.id}</span>}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-gray-400 text-center py-12">
                                                    <span>No data to preview</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ATSCVBuilder;