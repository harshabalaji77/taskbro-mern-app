/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAddTask, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [visible, setVisible] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate || '');
      setPriority(taskToEdit.priority || 'medium');
    } else {
      resetForm();
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || undefined,
      priority,
    });

    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-edit-modal-title"
      >
        <div className="p-6">
          <div className="mb-7">
            <div className="flex items-center justify-between mb-1">
              <h2 id="add-edit-modal-title" className="text-xl font-semibold text-gray-900">
                {taskToEdit ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[13px] text-gray-500">
              {taskToEdit
                ? 'Update the details below to modify your task'
                : 'Fill in the details below to create a new task'}
            </p>
          </div>

          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white text-sm transition-colors"
                placeholder="Enter task name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white text-sm resize-none transition-colors"
                rows={3}
                placeholder="Enter task description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      priority === p
                        ? p === 'low'
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : p === 'medium'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                Due Date <span className="font-normal text-gray-400">(Optional)</span>
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white text-sm transition-colors cursor-pointer"
                style={{ colorScheme: 'light' }}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                {taskToEdit ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;