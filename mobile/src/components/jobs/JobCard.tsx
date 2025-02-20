import { Job } from '@shared/src/types/job'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface JobCardProps {
  job: Job
  onPress: () => void
}

export const JobCard = ({ job, onPress }: JobCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Mobile-specific card content */}
    </TouchableOpacity>
  )
} 