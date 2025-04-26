import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { validateEmail, isNotEmpty } from '../utils/formValidation'; // Assuming validation functions exist

const JoinForm = ({ selectedPosition = '', isInline = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: selectedPosition,
    about: '',
    privacy: false,
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(prev => ({ ...prev, position: selectedPosition }));
  }, [selectedPosition]);

  const onDrop = useCallback(acceptedFiles => {
    // We only take the first file
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      // Basic validation (e.g., file type, size)
      if (file.type !== 'application/pdf' && file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          toast.error('Invalid file type. Please upload PDF or DOCX.');
          setResumeFile(null);
      } else if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error('File size exceeds 5MB limit.');
          setResumeFile(null);
      } else {
          setResumeFile(file);
          toast.success(`${file.name} selected.`);
          setErrors(prev => ({...prev, resume: null})); // Clear resume error
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
      onDrop,
      multiple: false, // Don't allow multiple files
      accept: {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      } 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!isNotEmpty(formData.fullName)) formErrors.fullName = 'Full Name is required';
    if (!validateEmail(formData.email)) formErrors.email = 'Invalid Email Address';
    if (!isNotEmpty(formData.position)) formErrors.position = 'Please select a position';
    if (!isNotEmpty(formData.about)) formErrors.about = 'Please tell us about yourself';
    if (!resumeFile) formErrors.resume = 'Resume is required';
    if (!formData.privacy) formErrors.privacy = 'You must accept the privacy policy';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement actual form submission logic (e.g., API call)
      console.log('Form Data:', formData);
      console.log('Resume File:', resumeFile);
      toast.success('Application submitted successfully!');
      // Reset form (optional)
      setFormData({ fullName: '', email: '', position: selectedPosition, about: '', privacy: false });
      setResumeFile(null);
      setErrors({});
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };
  
  const inputClass = (fieldName) => 
    `w-full px-4 py-3 border ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${errors[fieldName] ? 'focus:ring-red-500' : 'focus:ring-primary'} focus:border-transparent transition duration-300`;

  const formContent = (
     <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
            <label htmlFor={`fullName-${selectedPosition}`} className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" id={`fullName-${selectedPosition}`} name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass('fullName')} placeholder="John Doe" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
            <label htmlFor={`email-${selectedPosition}`} className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id={`email-${selectedPosition}`} name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Position Dropdown (Readonly if selectedPosition is passed) */}
        <div>
            <label htmlFor={`position-${selectedPosition}`} className="block text-sm font-medium text-gray-700 mb-1">Position Applying For</label>
            <select 
              id={`position-${selectedPosition}`} 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              className={`${inputClass('position')} ${selectedPosition ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              disabled={!!selectedPosition} // Disable if pre-selected
            >
                <option value="" disabled={!!selectedPosition}>Select a position...</option>
                {/* Keep options even if disabled for consistency */}
                <option value="SpringBoot Developer">SpringBoot Developer</option>
                <option value="Mobile App Developer (Flutter)">Mobile App Developer (Flutter)</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Video Editor">Video Editor</option>
            </select>
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
        </div>

        {/* About Yourself */}
        <div>
            <label htmlFor={`about-${selectedPosition}`} className="block text-sm font-medium text-gray-700 mb-1">Tell us about yourself</label>
            <textarea id={`about-${selectedPosition}`} name="about" rows="4" value={formData.about} onChange={handleChange} className={inputClass('about')} placeholder="A few points about your skills and experience..."></textarea>
            {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about}</p>}
        </div>

        {/* Resume Upload (Dropzone) */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF, DOC, DOCX - Max 5MB)</label>
            <div {...getRootProps()} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.resume ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md cursor-pointer hover:border-primary transition duration-300 ${isDragActive ? 'border-primary bg-blue-50' : 'bg-white'}`}>
                <input {...getInputProps()} />
                <div className="space-y-1 text-center">
                {resumeFile ? (
                    <FiCheckCircle className="mx-auto h-10 w-10 text-green-500" aria-hidden="true" />
                ) : (
                    <FiUploadCloud className="mx-auto h-10 w-10 text-gray-400" aria-hidden="true" />
                )}
                <div className="flex text-sm text-gray-600">
                    <p className="pl-1">
                    {isDragActive ? 'Drop the file here ...' : resumeFile ? `${resumeFile.name}` : 'Drag & drop file, or click to select'}
                    </p>
                </div>
                {!resumeFile && <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>}
                {resumeFile && <button type="button" onClick={(e) => {e.stopPropagation(); setResumeFile(null);}} className="mt-2 text-xs text-red-600 hover:text-red-800"><FiXCircle className="inline mr-1"/>Remove File</button>}
                </div>
            </div>
            {errors.resume && !resumeFile && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="flex items-center">
            <input id={`privacy-${selectedPosition}`} name="privacy" type="checkbox" checked={formData.privacy} onChange={handleChange} className={`h-4 w-4 ${errors.privacy ? 'border-red-500' : 'border-gray-300'} text-primary focus:ring-primary rounded`} />
            <label htmlFor={`privacy-${selectedPosition}`} className="ml-2 block text-sm text-gray-900"> I have read and accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">privacy policy</a> </label>
        </div>
            {errors.privacy && <p className="text-red-500 text-xs -mt-4">{errors.privacy}</p>}

        {/* Submit Button */}
        <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300 font-semibold shadow-md"
        >
            Submit Application for {selectedPosition || 'Selected Position'}
        </motion.button>
    </form>
  );

  if (isInline) {
    return formContent;
  }

  return (
    <section id="join" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-xl shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-neutral-900">Join Our Team</h2>
          {formContent}
        </motion.div>
      </div>
    </section>
  );
};

export default JoinForm; 