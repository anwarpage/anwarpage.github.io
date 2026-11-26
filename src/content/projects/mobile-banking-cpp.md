---
title: Mobile Banking CLI - Transaction & Search Algorithm in C++
description: A command-line banking simulation in C++ implementing sequential credential lookup, in-memory balance transitions, and struct-based transaction history.
date: 2024-06-19
category: Software Engineering
tags: C++, Sequential Search, Data Structures, Algorithm & Logic, CLI Simulation
projectType: Personal
image: /projects/mobile-banking-cpp/cover.avif
githubUrl: https://github.com/mkaspulanwar/Mobile-Banking-Algoritm-With-Cpp
team: M. Kaspul Anwar | https://github.com/anwarpage
techStack: C++, C++ Standard Library (iostream & string), Struct & 2D Array, Flowgorithm
---

Mobile Banking CLI is a command-line transaction simulation written in C++ to model core retail banking workflows—card-and-PIN authentication, balance inquiries, cash deposits, balance-checked withdrawals, and statement mutation logs—using fundamental in-memory data structures and control-flow algorithms without an external database.

https://youtu.be/-okEDTQCMsQ?si=LRvHrMOpqRUrJWM9

## Problem to Solve

Model a complete multi-user banking session in a standalone C++ console program by organizing customer credentials, live account balances, and chronological transaction logs using core data structures (`2D arrays` and `structs`), while enforcing valid state transitions (such as preventing overdraft withdrawals) across nested login and transaction loops.

## Solution Approach

The control flow was first mapped in Flowgorithm (`.fprg`) and implemented in `mobile-banking.cpp` around two primary data structures and a nested `do-while` session loop:

- **2D Array Account Table (`string akses[4][4]`)**: Stores four pre-registered customer accounts in memory, where each row maps `[0] kode_akses`, `[1] nomor_kartu`, `[2] nama_pengguna`, and `[3] saldo`.
- **Sequential Search Authentication**: During login, a linear scan (`for (int i = 0; i < 4; ++i)`) checks whether the submitted `nomor_kartu` and `kode_akses` match a row in `akses`. On match, `index_ditemukan = i` binds the active session to that customer's record.
- **Numeric Parsing & Overdraft Validation (`<string>`)**: Since balances are stored as strings inside the 2D array, deposits (`Setoran`) and withdrawals (`Tarik Tunai`) convert values with `std::stoi()`, check `if (tarikan > saldo_sekarang)` to block insufficient-balance withdrawals, and serialize the updated balance back via `std::to_string()`.
- **Append-Only Mutation Log (`struct Transaksi mutasi[100]`)**: Every completed deposit or withdrawal appends a typed `Transaksi` record (`jenis`, `tanggal`, `jumlah`) at `mutasi[jumlah_transaksi++]`, allowing the `Mutasi Rekening` menu to iterate and print the full session statement.

![Mobile Banking Authentication & Transaction Flow](/projects/mobile-banking-cpp/workflow.svg)

### Sequential Search & Transaction State Update

Below is the core credential lookup and withdrawal validation logic from `mobile-banking.cpp`:

```cpp
struct Transaksi {
	string jenis, tanggal, jumlah;
};

// 1. Sequential Search across the 4x4 account matrix
for (int i = 0; i < 4; ++i) {
	if (akses[i][0] == kode_akses && akses[i][1] == nomor_kartu) {
		ditemukan = true;
		index_ditemukan = i;
		break;
	}
}

// 2. Balance-checked withdrawal & struct mutation logging
int saldo_sekarang = stoi(akses[index_ditemukan][3]);
int tarikan = stoi(jumlah_tarikan);

if (tarikan > saldo_sekarang) {
	cout << "Saldo tidak mencukupi untuk melakukan penarikan." << endl;
} else {
	saldo_sekarang -= tarikan;
	akses[index_ditemukan][3] = to_string(saldo_sekarang);

	mutasi[jumlah_transaksi].jenis = "Tarik Tunai";
	mutasi[jumlah_transaksi].tanggal = "08-06-2024";
	mutasi[jumlah_transaksi].jumlah = jumlah_tarikan;
	jumlah_transaksi++;
}
```

## Impact

Demonstrated how foundational data structures (`2D arrays` and `structs`) and linear search algorithms work together to maintain consistent state across multi-step user sessions—bridging visual flowchart design in Flowgorithm with working C++ implementation.
