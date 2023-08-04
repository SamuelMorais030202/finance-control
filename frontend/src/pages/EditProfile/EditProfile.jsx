import React from 'react';

export const EditProfile = () => {
  return (
    <div>
      <h1>Edit profile</h1>
      <section className='profile'>
        <label htmlFor="fullName">
          <input type="text" />
        </label>
        <label htmlFor="email">
          <input type="text" />
        </label>
        <label htmlFor="password">
          <input type="text" />
        </label>
        <label htmlFor="phone">
          <input type="text" />
        </label>
        <button>
          Edit profile
        </button>
      </section>
    </div>
  )
}