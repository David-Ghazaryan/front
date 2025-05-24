import sentEmail from "/src/assets/images/sent-email.png";
export const SentEmailPage = () => {
    return (
        <div className=" flex flex-col min-h-screen items-center justify-center">
            <p className="text-2xl text-[var(--primary)] font-bold">Նամակը ուղարկված է ձեր Էլեկտրոնային հասցեին</p>
            <img src={sentEmail} alt="" />
        </div>
    );
}