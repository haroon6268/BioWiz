import React from 'react'

const Sidebar = () => {
  return (
    <div className="space-y-8 absolute h-[95vh] hidden bg-dark-green w-[50%] lg:w-[300px] flex flex-col items-center py-8">
        <div className="bg-light-green px-4 py-2 rounded-lg font-bold ">
            My Flashcard Sets
        </div>
        <div className="bg-light-green px-4 py-2 rounded-lg font-bold ">
            Create a Set
        </div>
    </div>
  )
}

export default Sidebar