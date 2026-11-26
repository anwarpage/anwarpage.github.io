---
title: Flappy Bird - C++ Console Edition
description: A discrete 2D coordinate simulation and real-time state loop built in C++ using Win32 console buffer manipulation and non-blocking I/O.
date: 2024-03-30
category: Software Engineering
tags: C++, Algorithm & Logic, Coordinate Simulation, Windows API, State Loop
projectType: Personal
image: /projects/flappy-bird-cpp/cover.avif
githubUrl: https://github.com/mkaspulanwar/Flappy-Bird-Basic-Version-Built-with-Cpp
team: M. Kaspul Anwar | https://github.com/anwarpage
techStack: C++, Windows API (windows.h), conio.h, C Standard Library (stdlib.h)
---

Flappy Bird (C++ Console Edition) is a lightweight 2D arcade clone built to run directly inside the Windows command prompt without external graphics libraries or game engines. Written as a single-file C++ program, it implements a complete real-time game loop—handling keyboard polling, gravity, procedural pipe generation, collision checks, and live score updates within a fixed `118×29` character grid.

## Problem to Solve

Standard console I/O in C++ (`std::cin` and `std::cout`) is designed for sequential text prompts rather than interactive real-time loops. Building a playable action game inside a raw terminal requires solving three practical constraints:

- **Blocking Input**: Standard input functions pause execution until the user presses Enter, which freezes gravity and obstacle movement.
- **Screen Flicker**: Clearing the entire console with `system("cls")` on every frame causes visible tearing and slow redraws.
- **Coordinate State & Collision**: Moving sprites, randomized pipe gaps, and hit detection have to be calculated manually against discrete character-cell coordinates.

## Solution Approach

The game is structured around a deterministic `while(1)` loop paced at `100ms` per tick (`~10 FPS`), combining standard C/C++ headers with the native Windows Console API:

- **Non-Blocking Input (`<conio.h>`)**: Uses `kbhit()` and `getch()` to poll keyboard events asynchronously on each tick. Pressing `Spacebar` (`ASCII 32`) applies an upward offset (`birdpos -= 3`), while `Esc` (`ASCII 27`) exits to the main menu; if no key is pressed, gravity (`birdpos += 1`) continues uninterrupted.
- **Targeted Cursor Redraws (`<windows.h>`)**: Wraps `SetConsoleCursorPosition` and `GetStdHandle(STD_OUTPUT_HANDLE)` in a `gotoxy(x, y)` helper. Instead of wiping the full terminal every tick, each frame overwrites only the previous bird (`3×9` ASCII matrix) and pipe coordinates with blank spaces (`erasebird()`, `erasepipe()`) before drawing their updated positions.
- **Two-Slot Pipe Recycling (`<stdlib.h>`)**: Rather than allocating new obstacle objects continuously, two active pipe slots (`pipepos`, `gappos`, `pipestat`) are recycled across the `98`-column playfield. When Pipe `0` reaches column `67`, Pipe `1` spawns with a randomized 7-row vertical opening (`3 + rand() % 14`); once Pipe `0` passes column `95`, its state is replaced by Pipe `1` and the score increments.
- **Interval Collision Detection**: Once an approaching pipe reaches the bird's horizontal zone (`pipepos[0] >= 80`), `collapse()` verifies whether `birdpos` falls outside the safe vertical opening `[gappos[0], gappos[0] + 7]` or touches the bottom border (`birdpos > 28`).

![Runtime Game Loop & Console Buffer Pipeline](/projects/flappy-bird-cpp/pipeline-workflow.svg)

### Core Loop & Cursor Positioning

Below are the core cursor-positioning, collision, and pipe-handoff routines from `project game flappy bird.cpp`:

```cpp
// Move the Win32 console cursor directly to (x, y) to avoid full-screen clears
void gotoxy(int x, int y) {
	coord.X = x;
	coord.Y = y;
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

// Check vertical bounds when the leading pipe reaches the bird's X-zone
int collapse() {
	if (pipepos[0] >= 80) {
		if (birdpos < gappos[0] || birdpos > gappos[0] + holesize) {
			return 1;
		}
	}
	return 0;
}

// Spawn the second pipe mid-screen and recycle slot 0 once it exits left
if (pipepos[0] >= 67 && pipepos[0] < 69) {
	pipestat[1] = 1;
	pipepos[1] = 4;
	genpipe(1); // gappos[1] = 3 + rand() % 14
}
if (pipepos[0] > 95) {
	score++;
	updatescore();
	pipestat[1] = 0;
	pipepos[0] = pipepos[1];
	gappos[0] = gappos[1];
}
```

| Header / API            | Role in Project                                                                 |
| ----------------------- | ------------------------------------------------------------------------------- |
| `<iostream>`            | Renders ASCII borders, menu screens, bird matrix, and HUD text via `std::cout`. |
| `<windows.h>`           | Controls cursor coordinates (`SetConsoleCursorPosition`) and frame pacing (`Sleep(100)`). |
| `<conio.h>`             | Provides non-blocking key detection (`kbhit()`, `getch()`, `getche()`).         |
| `<stdlib.h>`            | Generates randomized pipe gap heights (`rand()`) and console state commands.    |

## Impact

Delivered a playable, dependency-free console game in ~320 lines of C++ that puts fundamental programming concepts into practice—translating raw terminal buffer coordinates, non-blocking I/O polling, state recycling, and bounding-box checks into a responsive interactive loop.
