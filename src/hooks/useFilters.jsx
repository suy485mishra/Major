import {useQuery} from 'react-query'

import React from 'react'

const useFilters = () => {
    const {data,isLoading,isError,refetch}=useQuery(
        'globalFilter',
        ()=>({
            searchTerm:''
        }),
        {refetchOnWindowFocus:false}
    )
  return {data,isLoading,isError,refetch};
}

export default useFilters