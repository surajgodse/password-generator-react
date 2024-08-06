import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import validator from "validator";

export default function PasswordGenerator() {

    const rLength = useRef();

    const [length, setLength] = useState("");
    const [uppercase, setUppercase] = useState(false);
    const [digits, setDigits] = useState(false);
    const [special, setSpecial] = useState(false);
    const [password, setPassword] = useState("");

    const hLength = (event) => { setLength(event.target.value); }
    const hUppercase = (event) => { setUppercase(event.target.checked); }
    const hDigits = (event) => { setDigits(event.target.checked); }
    const hSpecial = (event) => { setSpecial(event.target.checked); }

    const generatePassword = () => {
        let text = "abcdefghijklmnopqrstuvwxyz";
        if (uppercase) text += text.toUpperCase();
        if (digits) text += "0123456789";
        if (special) text += "!@#$%^&*()";

        let pw = "";
        let len = parseInt(length);
        for (let i = 1; i <= len; i++) {
            let r = parseInt(Math.random() * text.length);
            pw += text[r];
        }
        setPassword(pw);
    };

    const copyToClipboard = () => {
        if (password !== "") {
            navigator.clipboard.writeText(password);
            toast.success("Copied to clipboard", { autoClose: 5000 });
        }
    };

    const checkPasswordStrength = () => {
        const sp = { minLength: 8, minLowerCase: 1, minUpperCase: 1, minNumbers: 1, minSymbols: 2 };
        if (validator.isStrongPassword(password, sp)) {
            toast.success("Strong", { autoClose: 5000 });
        } else {
            toast.warning("Weak", { autoClose: 5000 });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (length === "") {
            alert("You did not enter the password length");
            rLength.current.focus();
            navigator.clipboard.writeText("");
            setPassword("");
            return;
        }

        const btnName = event.nativeEvent.submitter.name;
        if (btnName === "sub") {
            generatePassword();
        } else if (btnName === "ctc") {
            copyToClipboard();
        } else if (btnName === "ps") {
            checkPasswordStrength();
        }
    };

    return (
        <>
            <center>
                <h1>Password Generator</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter Password Length</label>
                    <input type="number" min={8} max={20} onChange={hLength} ref={rLength} value={length} />
                    <br /><br />
                    <div className="checkbox-group">
                        <input type="checkbox" onChange={hUppercase} id="uppercase" />
                        <label htmlFor="uppercase">Uppercase</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" onChange={hDigits} id="digits" />
                        <label htmlFor="digits">Digits</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" onChange={hSpecial} id="special" />
                        <label htmlFor="special">Special Characters</label>
                    </div>
                    <br />
                    <input type="submit" name="sub" value="Generate Password" className="btn" />
                    <button type="button" name="ctc" className="btn" onClick={copyToClipboard}>Copy to Clipboard</button>
                    <button type="button" name="ps" className="btn" onClick={checkPasswordStrength}>Password Strength</button>
                </form>
                <h2>{password}</h2>
                <ToastContainer />
            </center>
        </>
    );
}
