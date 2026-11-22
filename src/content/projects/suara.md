---
title: Suara - Public Aspiration & Policy Voting Platform
description: A native Android e-democracy app where citizens register with their NIK, read public policies, cast one vote per policy, discuss it, and send aspirations to government agencies.
description_id: Aplikasi Android e-demokrasi tempat warga mendaftar dengan NIK, membaca kebijakan publik, memberikan satu suara per kebijakan, berdiskusi, dan mengirim aspirasi ke instansi pemerintah.
date: 2025-12-12
category: Mobile
tags: Civic Tech, E-Democracy, Public Policy, Android
projectType: Personal
image: /projects/suara.avif
githubUrl: https://github.com/anwarpage/SUARA-230104040212-TUGASAKHIR
team: M. Kaspul Anwar | https://github.com/anwarpage
techStack: Kotlin, Jetpack Compose, MVVM & StateFlow, Kotlin Coroutines, Navigation Compose, Appwrite (Auth, Databases, Storage)
---

SUARA (_Sistem untuk Aspirasi Rakyat_) is a native Android e-democracy app that gives citizens one place to follow public policies, vote on them, and send aspirations to the agencies responsible. It is built with **Kotlin** and **Jetpack Compose** in an MVVM architecture, using **Appwrite** for authentication, data, and file storage.

## Problem to Solve

Public consultation is only meaningful when the people taking part are real and every voice counts exactly once. An MVP for policy participation had to solve three things:

- **One Citizen, One Voice**: Anonymous polls are easy to flood. Participation needs to be tied to a verifiable identity so each person votes only once per policy.
- **Policies Citizens Can Actually Read**: Announcements are scattered across agency websites. Citizens need a single feed with clear context, category filters, and visible public sentiment.
- **Aspirations That Reach the Right Desk**: Complaints sent through social media rarely reach the agency in charge. Reports need a target institution, supporting evidence, and a trackable status.

## Solution Approach

The app is organized around four participation flows, each backed by an Appwrite collection:

- **NIK-Based Registration**: Sign-up requires a valid **16-digit NIK** and a password of at least 8 characters. The NIK becomes the Appwrite **account ID** and the ID of the user's profile document, which is readable and editable only by its owner. A second account with the same NIK is rejected by Appwrite itself.
- **Policy Feed & Detail**: Policies from ministries and regional agencies are grouped by category, with a **Trending** sort ranked by votes plus comments. For each policy, votes and comments are fetched **in parallel** with coroutines (`async`/`await`) to show the agree percentage directly on the feed card.
- **One-Vote-Per-Policy Voting**: Each vote is stored as a document keyed by `policy_id` and `user_id`. Voting again **updates** that document instead of creating a new one, so a citizen can change their mind without being counted twice through the app. The detail screen shows agree/disagree sentiment, the user's own choice, and a public comment thread.
- **Aspiration Reports**: Citizens choose the target agency, write a title and description, and can attach a **photo as evidence** (uploaded to Appwrite Storage). Every report starts as `pending` and can be filtered by status (Waiting, In Progress, Done). Reports are publicly readable, but only their author can edit or delete them.

![SUARA Participation Flow on Appwrite](/projects/suara/participation-flow.svg)

### One Vote Per Citizen

Below is the voting logic from `data/remote/AppwriteService.kt`. An existing vote for the same policy and user is updated; otherwise a new one is created:

```kotlin
suspend fun submitVote(policyId: String, userId: String, status: String): Boolean {
    return try {
        val existingDocId = getUserVoteDocumentId(policyId, userId)

        if (existingDocId != null) {
            databases.updateDocument(
                databaseId = AppwriteConfig.DATABASE_ID,
                collectionId = "votes",
                documentId = existingDocId,
                data = mapOf("status" to status)
            )
        } else {
            databases.createDocument(
                databaseId = AppwriteConfig.DATABASE_ID,
                collectionId = "votes",
                documentId = ID.unique(),
                data = mapOf(
                    "policy_id" to policyId,
                    "user_id" to userId,
                    "status" to status
                )
            )
        }
        true
    } catch (e: Exception) {
        e.printStackTrace()
        false
    }
}
```

### NIK as the Account Identity

Below is the registration step from `ui/viewmodel/RegistrationViewModel.kt`. The validated NIK is used as both the account ID and the owner-only profile document ID:

```kotlin
appwriteService.account.create(
    userId = _nik.value, // 16-digit NIK, validated before submit
    email = _email.value,
    password = _password.value,
    name = _nama.value
)

appwriteService.databases.createDocument(
    databaseId = DATABASE_ID,
    collectionId = "users",
    documentId = _nik.value,
    data = mapOf("nama" to _nama.value, "email" to _email.value),
    permissions = listOf(
        Permission.read(Role.user(_nik.value)),
        Permission.update(Role.user(_nik.value)),
        Permission.delete(Role.user(_nik.value))
    )
)
```

### Appwrite Data Model

| Collection        | Key Fields                                         | Who Can Write              | Purpose                                  |
| ----------------- | -------------------------------------------------- | -------------------------- | ---------------------------------------- |
| `users`           | NIK (document ID), `nama`, `email`                 | Owner only                 | Citizen profile tied to a single NIK     |
| `policies`        | `institution`, `category`, `title`, `content`      | Not editable from the app  | Public policy feed and detail            |
| `votes`           | `policy_id`, `user_id`, `status`                   | Voter, upserted by the app | Agree / disagree sentiment               |
| `policy_comments` | `policy_id`, `user_id`, `user_name`, `message`     | Users in the app           | Public discussion per policy             |
| `aspirations`     | `institution`, `title`, `description`, `image_id`  | Author (edit / delete)     | Reports to agencies with photo evidence  |

## Impact

Delivered a working Android MVP that covers the full participation loop: a citizen registers with their NIK, reads a policy, votes once, joins the discussion, and sends an aspiration with photo evidence to the responsible agency. The next steps toward production are enforcing one vote per citizen with a unique index on (`policy_id`, `user_id`), moving vote tallies to a server-side aggregate (the app currently counts votes on the device from the first page of results), adding pagination to comments, and connecting the community **Stream** feed, which still uses sample posts, to live data.
