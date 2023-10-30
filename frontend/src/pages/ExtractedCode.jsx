import React from 'react'

const ExtractedCode = () => {
    //extracted from HompePage.jsx
  return (
    <main>
      <div className="flex justify-center w-[20rem] m-auto gap-4">
        <LoginButton />
        {isAuthenticated && <LogoutButton />}
      </div>
      {isAuthenticated && (
        <>
          <Profile user={user} isAuthenticated={isAuthenticated} />
          <button
            className="border p-2 bg-slate-500 rounded-xl m-auto block"
            onClick={handleClick}
          >
            GET JOBS
          </button>
          {isRequestingJobs ? (
            <div>Loading...</div>
          ) : (
            <ul className="text-center">
              {data?.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

export default ExtractedCode