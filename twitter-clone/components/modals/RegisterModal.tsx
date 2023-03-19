import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, isLoading, loginModal]);
  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);
      // TODO ADD LOG IN
      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="
                    text-white
                    cursor-pointer
                    hover:underline
                "
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Login"
      actionLabel="Sign up"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
