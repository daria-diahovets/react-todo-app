interface IForm {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
  descrRef: React.RefObject<HTMLInputElement | null>;
}

export default function Form({ handleSubmit, titleRef, descrRef }: IForm) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="TITLE" ref={titleRef} />
      <input
        type="text"
        name="description"
        placeholder="DESCRIPTION"
        ref={descrRef}
      />
      <button>Create</button>
    </form>
  );
}
