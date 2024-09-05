// src/components/ActivityTracker/ActivityTracker.js
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import AnimatedIcon from '../common/AnimatedIcon';
import styles from './ActivityTracker.module.css';

function ActivityTracker({ student }) {
  const { data: activities, loading, error, execute: fetchActivities } = useApi(/* API function to fetch activities */);
  const { execute: updateActivity } = useApi(/* API function to update activity */);

  useEffect(() => {
    fetchActivities(student.id);
  }, [fetchActivities, student.id]);

  const handleActivityToggle = async (activityId, completed) => {
    await updateActivity(activityId, completed);
    // Refresh activities or update local state
  };

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.activityTracker}>
      <h2>
        <AnimatedIcon animation="rotate">🎯</AnimatedIcon>
        Activity Tracker
      </h2>
      <ul className={styles.activityList}>
        {activities.map(activity => (
          <li key={activity.id} className={styles.activityItem}>
            <input 
              type="checkbox" 
              checked={activity.completed}
              onChange={(e) => handleActivityToggle(activity.id, e.target.checked)}
              className={styles.checkbox}
            />
            <span className={styles.activityName}>{activity.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityTracker;