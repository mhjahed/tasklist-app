import React, { useState } from 'react';
import { formatDate } from '../../utils/dateHelpers';
import './TaskCard.css';

const TaskCard = ({ task, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: task.name,
    notes: task.notes || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: task.name,
      notes: task.notes || ''
    });
    setIsEditing(false);
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      personal: '👤',
      work: '💼',
      health: '💪',
      learning: '📚',
      other: '📌'
    };
    return icons[category] || '📌';
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>
        
        <div className="task-meta">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className="category-badge">
            {getCategoryIcon(task.category)} {task.category}
          </span>
        </div>
      </div>

      <div className="task-card-body">
        {isEditing ? (
          <input
            type="text"
            className="task-edit-input"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            autoFocus
          />
        ) : (
          <h3 className="task-name">{task.name}</h3>
        )}

        {isEditing ? (
          <textarea
            className="task-edit-textarea"
            value={editData.notes}
            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
            placeholder="Add notes..."
            rows="2"
          />
        ) : (
          task.notes && <p className="task-notes">{task.notes}</p>
        )}

        <div className="task-date">
          📅 {formatDate(task.date)}
        </div>
      </div>

      <div className="task-card-footer no-print">
        {isEditing ? (
          <>
            <button className="btn-save" onClick={handleSave}>
              ✓ Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={handleEdit}>
              ✏️ Edit
            </button>
            <button className="btn-delete" onClick={() => onDelete(task.id)}>
              🗑️ Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;