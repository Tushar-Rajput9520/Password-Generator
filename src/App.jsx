import { useState, useCallback, useEffect, useRef } from "react";
import { FaRegCopy, FaEye, FaEyeSlash, FaSync } from "react-icons/fa";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setToast("✅ Password copied!");
    setTimeout(() => setToast(""), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const passwordStrength = () => {
    let strength = 0;
    if (length >= 8) strength++;
    if (numAllowed) strength++;
    if (charAllowed) strength++;
    if (strength === 3) return "Strong 💪";
    if (strength === 2) return "Medium 👍";
    return "Weak 😐";
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl p-6 rounded-2xl max-w-md w-full text-white">
        <h1 className="text-center text-2xl font-bold mb-4">
          <span role="img" aria-label="lock">🔐</span> Password Generator
        </h1>

        <div className="flex items-center bg-white/20 rounded-lg overflow-hidden shadow-inner mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            readOnly
            ref={passwordRef}
            className="w-full px-4 py-2 bg-transparent text-yellow-300 outline-none"
          />
          <button onClick={copyPassword} className="px-3 text-white hover:text-green-300 transition">
            <FaRegCopy />
          </button>
          <button onClick={() => setShowPassword((prev) => !prev)} className="px-3 text-white hover:text-blue-300 transition">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button onClick={passwordGenerator} className="px-3 text-white hover:text-pink-300 transition">
            <FaSync />
          </button>
        </div>

        {toast && (
          <div className="text-sm text-green-300 text-center mb-3 animate-pulse">
            {toast}
          </div>
        )}

        <div className="text-sm mb-4 text-yellow-200 text-center">
          Strength: <span className="font-bold">{passwordStrength()}</span>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <label className="text-orange-300">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => setLength(+e.target.value)}
              className="w-1/2 accent-orange-400"
            />
          </div>

          <div className="flex gap-3 justify-between">
            <label className="flex items-center gap-2 text-orange-200">
              <input
                type="checkbox"
                checked={numAllowed}
                onChange={() => setNumAllowed((prev) => !prev)}
              />
              Include Numbers
            </label>
            <label className="flex items-center gap-2 text-orange-200">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
