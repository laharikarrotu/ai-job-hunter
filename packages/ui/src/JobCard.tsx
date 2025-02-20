import { Job } from '@shared/types'

// Base component that works on both platforms
export const JobCard = ({ 
  job, 
  onPress 
}: { 
  job: Job
  onPress: () => void 
}) => {
  // Platform-specific rendering
  if (Platform.OS === 'web') {
    return <WebJobCard job={job} onClick={onPress} />
  }
  return <MobileJobCard job={job} onPress={onPress} />
} 