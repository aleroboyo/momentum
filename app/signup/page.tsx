'use client'

import Link from "next/link"

const Signup = () => {
  return (
    <div>

      <div>h</div>

      <div>
        <h4>Already have an account?
          <span>
            <Link href='/login'><button>Click here to Log in</button></Link>
          </span>
        </h4>

        <div>
          <h1>Sign Up</h1>

        </div>
      </div>

    </div>
  )
}

export default Signup
