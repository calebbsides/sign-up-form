import { useEffect, useState } from 'react';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [passwordMeetsRequirements, setPasswordMeetsRequirements] =
    useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      if (password !== passwordConfirm) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }
  }, [password, passwordConfirm, hasSubmitted]);

  useEffect(() => {
    const regex = new RegExp('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).*');

    if (hasSubmitted) {
      setPasswordMeetsRequirements(password.match(regex));
    }
  }, [password, hasSubmitted]);

  function handleInputChange(e) {
    const { value, name } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'password-confirm':
        setPasswordConfirm(value);
        break;
      default:
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    setHasSubmitted(true);
  }

  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            onChange={handleInputChange}
            value={email}
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            onChange={handleInputChange}
            value={password}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div>
          <label htmlFor="password-confirm" className="sr-only">
            Confirm Password
          </label>
          <input
            onChange={handleInputChange}
            value={passwordConfirm}
            id="password-confirm"
            name="password-confirm"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Confirm Password"
          />
          {hasSubmitted ? (
            passwordsMatch ? (
              <span className="text-xs text-green-700" id="passwordHelp">
                Passwords match.
              </span>
            ) : (
              <span className="text-xs text-red-700" id="passwordHelp">
                Passwords do not match.
              </span>
            )
          ) : null}
          <div>
            {hasSubmitted && !passwordMeetsRequirements ? (
              <span className="text-xs text-red-700" id="passwordHelp">
                Password must contain an uppercase and 1 digit.
              </span>
            ) : null}
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
