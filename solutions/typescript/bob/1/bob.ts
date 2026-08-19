const answers: string[] = ["Whatever.", "Sure.", "Whoa, chill out!", "Calm down, I know what I'm doing!"];

export const hey = (input: string): string => {
  const speech = input.trim()
  if (speech == "") return "Fine. Be that way!"
  
  const isQuestion = speech.endsWith("?") ? 1 : 0
  const isShout = /[A-Z]/.test(speech) && !/[a-z]/.test(speech) ? 2 : 0

  return answers[isQuestion + isShout]
}