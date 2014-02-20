light-typedclojure
==================
Official Typed Clojure plugin for Light Table

This is α software; see [below](#prerelease-caveats) for existing issues.

## Installation
Typed Clojure is available in the plugin manager.

Alternatively, you can manually clone this repository and either:  
- place it within Light Table's plugin folder, or
- simply eval the contents of Typed_Clojure/src/lt/plugins/typedclojure.cljs, for testing purposes.

### Dependencies
Light Table 0.6.4  
Clojure plugin 0.0.8  
Paredit plugin 0.0.4  

Your project should include `[org.clojure/core.typed "0.2.30"]` or above.

## Usage
The following commands are currently available:

`Typed Clojure: check namespace`  
to typecheck the namespace defined in your current file (as saved on disk).

`Typed Clojure: check var or form`  
to typecheck the variable or form under the cursor, or in the selection.

`Typed Clojure: annotate var`  
to annotate a var with a type through `clojure.core.typed/ann`, fully qualifying it if necessary.

`Typed Clojure: annotate form`  
to annotate a form or symbol with a type through `clojure.core.typed/ann-form`.

To bind keys to any of these functions, add any of the following commands to your user.keymap:  
```clojure
{:+ {:editor.clj {"keybinding" [:typedclojure.check.ns]
                  "keybinding" [:typedclojure.check.form]
                  "keybinding" [:typedclojure.ann.var]
                  "keybinding" [:typedclojure.ann.form]}}}
```

## Prerelease caveats
Typecheck messages are currently displayed in a rather awkward fashion, particularly for var/form checks, which appear several lines below the relevant form. This will be fixed when the new [:inline-at-cursor](https://github.com/LightTable/Clojure/commit/26dca158e1ed67f2df66d5d98fa6244f24ebf134) result mode lands in the official Clojure plugin. 

The annotation commands may behave goofily or fail if the cursor is at a form boundary or in whitespace. They also do not reposition your cursor properly; this will be easier to fix if/when [LightTable/Clojure#11](https://github.com/LightTable/Clojure/pull/11) is merged.

#### Workarounds
If you are feeling git-happy, you can fix the display issues by pulling a few changes manually.
- Update your Clojure plugin to the latest master.
- Update your light-typedclojure plugin by pulling branch `inline-at-cursor`.
