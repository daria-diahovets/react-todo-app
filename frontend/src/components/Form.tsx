interface IForm {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
  descrRef: React.RefObject<HTMLInputElement | null>;
}

export default function Form({ handleSubmit, titleRef, descrRef }: IForm) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="TITLE" ref={titleRef} maxLength={25}/>
      <input
        type="text"
        name="description"
        placeholder="DESCRIPTION"
        ref={descrRef}
        maxLength={150}
      />
      <button>Create</button>
    </form>
  );
}
