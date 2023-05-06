const emoji = "🔥";
const rocket = "🚀";
const biceps = "💪";
const em = "😅";
const frontDev = confirm("Czy chcesz zostać junior developerem?");

if (frontDev) {
  alert(`Ucz się regularnie ${rocket}`);
  const result = prompt("Ile czasu dziennie spędzasz nad nauką programowania?");
  if (6 <= result) {
    alert("Wow lecisz jak burza! " + emoji);
  } else {
    result <= 5 && result >= 1
      ? alert("Powoli a do przodu " + biceps)
      : alert("Mam nadzieję to to tymczasowe " + em);
  }
} else {
  alert("W takim wypadku, co tutaj robisz ?");
}
