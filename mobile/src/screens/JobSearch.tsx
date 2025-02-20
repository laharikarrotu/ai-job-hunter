import { JobCard } from '@packages/ui'
import { useJobs } from '@shared/hooks'

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