import React from 'react'
import { View, FlatList } from 'react-native'
import { JobCard } from '../components/jobs/JobCard'
import { SearchBar } from '../components/common/SearchBar'
import { useJobs } from '../hooks/useJobs'

export const JobSearchScreen = () => {
  const { jobs, searchJobs } = useJobs()

  return (
    <View style={styles.container}>
      <SearchBar onSearch={searchJobs} />
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate('JobDetail', { job: item })}
          />
        )}
      />
    </View>
  )
} 