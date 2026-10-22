const checklistItems = [
  "Thank your recommenders, counselor, teachers, friends, and anyone else who helped you",
  "Withdraw from schools you know you will not attend",
  "Join admitted student groups, but do not let them stress you out",
  "Think carefully about housing and roommate preferences",
  "Save important documents somewhere you can find them later",
  "Enjoy the end of senior year",
];

export default function ChapterAndItsOver() {
  return (
    <>
      <p>
        Congratulations! You made it through one of the strangest, most stressful, most
        over-discussed processes of high school.
      </p>
      <p>Before you fully move on, a few final things to do:</p>

      <ul className="checklist">
        {checklistItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p>
        The college process can feel like it determines everything. It does not. It matters,
        obviously, but it is also just the beginning of the next thing :)
      </p>
    </>
  );
}
