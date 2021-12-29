---
layout: post
title:  "Useful Unix commands"
date:   2021-05-26 5:20:00 -0700
category: devEnv
---

I recently began going through Michael Hartl's Learn Enough Command Line to Be Dangerous course, and I'm using this post to keep notes about useful Unix commands.

## Basics

Learn Enough covers crucial commands for the Unix command line. Unix is a family of operating systems, including Linux, Android, iOS, and macOS.

### Sidebar: Using Z shell instead of Bourne-again shell

In 2019, Apple changes the default shell on MacOS to zsh from bash. zsh behaves much like Bash, but it's worth making a few minor configuration updates to make Zsh behave more like Bash. You can [read more](https://scriptingosx.com/2019/06/moving-to-zsh/) about the switch from Bash to Zsh. MacOS also ships with Bash installed! So switching your Mac's default shell to Bash is an option.

I've chosen to keep using zsh, and followed [Hartl's advice](https://news.learnenough.com/macos-bash-zshell) to add these aliases to my `.zshrc` configuration file:

```zsh
# Avoid accidental deletion.
alias rm='rm -i'
alias mv='mv -i'
alias cp='cp -i'
# Prevent rm -f from asking for confirmation on things like `rm -f *.bak`.
setopt rm_star_silent
```

Out of the box, zsh doesn't prompt the user when they attempt to remove, move, or copy a file. These behavioral changes make zsh prompt me when I try to remove, move, or copy a file (like bash!).

### Editing and entering commands

Editing the command line is a regular part of a developer's day. These keybindings and commands are helpful to making command line usage more efficient.

| What | How |
| --- | --- |
| Display manual page for command | `man <command>` |
| Cursor to beginning of line | `^A` |
| Cursor to end of line | `^E` |
| Clear to beginning of line | `^U` |
| Cursor to mouse | `option + click` |
| Clear (non-destructive) | `^L` |
| Exit terminal | `^D` |
| Abort | `^C` |
| Sleep | `sleep (seconds)` |

### Repeating previous commands

Up to this point, I've primarily used up and down arrow to cycle through previously entered commands. But through this course, I learned some extremely helpful commands to make the process of finding past commands more efficient.

| What | How |
| --- | --- |
| Run the previous command exactly as written | `!!` |
| Run the last command by search | `!<argument>` ex: `!curl` |
| Search interactively through previous commands | `^R` |

## File manipulation

Some of the most important tasks at a command line: manipulating files.

### Redirecting and appending

| What | How |
| --- | --- |
| Redirect operator | `echo "String" > filename.txt` |
| Return (concatenate) contents of file | `cat filename.txt` |
| Append operator | `echo "String 2" >> filename.txt` |
| Compare differences of files | `diff file1.txt file2.txt` |
| Change modification time on file (create empty file) | `touch filename.md` |

Example of combining file manipulation commands:

```zsh
$ echo "From fairest creatures we desire increase," > sonnet_1.txt
$ echo "That thereby beauty's Rose might never die," >> sonnet_1.txt
$ echo "From fairest creatures we desire increase," > line_1.txt
$ echo "That thereby beauty's Rose might never die," > line_2.txt
$ cat line_1.txt > sonnet_1_copy.txt
$ cat sonnet_1_copy.txt
From fairest creatures we desire increase,
$ cat line_2.txt >> sonnet_1_copy.txt
$ cat sonnet_1_copy.txt
From fairest creatures we desire increase,
That thereby beauty's Rose might never die,
```

### Listing

| What | How |
| --- | --- |
| List all files and directories (except hiddens) | `ls` |
| List all files and directories (plus hiddens) | `ls -a` |
| List files ending in .txt | `ls *.txt` |
| List files in **l**ong format | `ls -l` |
| List files by **r**eversed **t**ime of modification (**l**ong format) | `ls -rtl` |

Options can be combined in any order, so `ls -rtl` is the same as `ls -trl` and `ls -r -t -l`

#### Sidebar: Oh My Zsh

I've been using [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) for a while, and a zsh alias I use all the time is `l=ls -lah`, which combines options for **l**ong format, **a**ll files and directories, and **h**uman readable filesize.

These listing aliases are made available by Oh My Zsh:

```zsh
alias lsa='ls -lah'
alias l='ls -lah'
alias ll='ls -lh'
alias la='ls -lAh'
```

### Renaming, copying, deleting

Beyond listing files, moving, copying and deleting them is the next most common computer-toucher activity!

| What | How |
| --- | --- |
Move (or simply rename) a file | `mv current_name new_name`
Copy a file | `cp to_be_copied.txt copy.txt`
Delete a file | `rm file.txt`
Delete files without confirmation | `rm -f *.txt`

### Inspecting

The Learn Enough lesson on inspecting files begins by downloading a text file containing 2620 lines. 

#### Sidebar: Downloading a file with cURL

I've seen the `cURL` command in the wild, and this lesson was a good opportunity for me to practice using it to download the `sonnets.txt` file to then inspect it in this lesson. Here's the command:

```console
$ cURL -OL https://cdn.learnenough.com/sonnets.txt
$ ls -rtl
...
-rw-r--r--  1 pmac  staff  95635 May 26 09:35 sonnets.txt
...
```

Above, the `-OL` options on `cURL` combine `--location` and `--remote-name`.

- The `--location` (or `-L`) option makes curl redo the request if the server reports that the requested page has moved to a different location, indicated with a Location header or 3XX (redirect) HTTP response code.
- The `--remote-name` (or `-O`) option tells curl to write output to a local file named like the remote file we get (only the file part of the remote file is used, not the path). The file will be saved in the current working directory. In this example, the `sonnets.txt` file is saved to the current working directory.

#### Head and tail

| What | How |
| --- | --- |
Return the first 10 lines of a file | `head sonnets.txt`
Return the last 10 lines of a file | `tail sonnets.txt`
Return the lines, words, bytes of a file | `wc sonnets.txt`
Combine head and wc with PIPES! | `head sonnets.txt | wc`
View a file that's actively changing | `tail -f`

##### Sidebar: What the pipe

The reason `head sonnets.txt | wc` works is that the `wc` command can take input from `STDIN` or a filename. In this usage, the result of `head sonnets.txt` is piped into the `wc` command to return its line, word, and byte counts.

#### Less is more

The `less` command allows for navigation of a file. Before going through Learn Enough, I wasn't aware that I had spent plenty of time in `less`! For example, manual pages (i.e. `man <command>`) use `less` to read and display file text in the command line. 

When viewing the contents of a file with `less`, these commands are some of the most useful:

| What | How |
| --- | --- |
Move up or down one line | `up & down arrows`
Move forward one page | `spacebar`
Move forward one page | `^F`
Move back one page | `^B`
Move to end of file | `G`
Move to beginning of file | `1G`
Search file for string | `/<string>`
Move to next search result | `n`
Move to previous search result | `N`
Quit `less` | `q`
