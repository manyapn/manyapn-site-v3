export default function SymbolicEquationSolverWriteup() {
  return (
    <>
      <p>
        This was my CS 3110 final project, written in OCaml with my team in spring 2026. A LaTeX
        string goes through a lexer into tokens, a recursive-descent parser turns the tokens into
        an AST, and from there the tree can be evaluated or solved. On top of the engine we built a
        two-player math race over TCP, where the server generates algebra problems and whoever
        answers first takes the round.
      </p>

      <p>
        Eval walks the tree under a variable environment, substituting anything that&apos;s bound
        and constant-folding as it goes. Free variables stay put, so a partial result comes back as
        an expression rather than an error. Solve isolates a variable by peeling inverse operations
        off whichever side it&apos;s on, add becomes subtract, <code>\sqrt</code> becomes squaring,{" "}
        <code>\ln</code> becomes <code>\exp</code>, and when the variable is on both sides it moves
        the var-free subterms right first. Results print back out through two pretty-printers, one
        for LaTeX and one for plain ASCII in the terminal. Exponentiation is right-associative so{" "}
        <code>2^3^2</code> is 512, summations expand the body over the index range, and integrals
        only evaluate when the integrand reduces to a constant.
      </p>

      <h2>The game</h2>

      <p>
        It&apos;s ten rounds between two players. Problems come from templates in a JSON file with
        random numbers filled in, and the server grades answers using the solver itself, so the
        expected answer always agrees with what the engine would compute. Messages go over TCP as
        newline-terminated plain text (<code>PROBLEM</code>, <code>ANSWER</code>,{" "}
        <code>CORRECT</code>, <code>SCORE</code>), and serialize and deserialize are the whole wire
        format, no JSON library. The game state is pure, every transition returns a new state,
        which meant we could test the rules without opening a socket.
      </p>

      <p>
        There are 186 OUnit tests across the lexer, parser precedence, evaluation, the
        solver&apos;s inverse cases, the protocol round-trip, and the game state machine. One bug
        we know about: the template <code>\frac{"{x}"}{"{\\binom{a}{b}}"}</code> can draw b &gt; a
        and produce a zero denominator, and the solver answers x = 0 there rather than rejecting
        it.
      </p>
    </>
  );
}
