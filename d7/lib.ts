type File = number;

type Files = {
  [key: string]: Files | File;
};

type FS = {
  workdir: string[];
  files: Files;
};

const createFS = (): FS => ({
  workdir: ["/"],
  files: {
    "/": {} as Files,
  },
});

const moveDir = (fs: FS, dir: string) => {
  if (dir === "/") {
    fs.workdir = ["/"];
    return;
  }

  if (dir === "..") {
    fs.workdir.pop();
    return;
  }

  fs.workdir.push(dir);
};

const getWorkDirRef = (fs: FS): Files => {
  return fs.workdir.reduce((files, path) => files[path] as Files, fs.files);
};

const addFile = (fs: FS, file: string) => {
  const workDir = getWorkDirRef(fs);

  if (/^dir /.test(file)) {
    const dir = file.replace(/^dir /, "");
    workDir[dir] = {} as Files;
    return;
  }

  const [size, name] = file.split(" ");
  const fileData: File = +size;
  workDir[name] = fileData;
};

const performAction =
  (fs: FS) =>
  (inst: string): void => {
    if (/^\$ cd /.test(inst)) {
      const dir = inst.replace(/^\$ cd /, "");
      moveDir(fs, dir);
      return;
    }

    if (/^[^$]/.test(inst)) {
      addFile(fs, inst);
      return;
    }
    return;
  };

type Sizes = {
  [key: string]: number;
};

const getDirSize = (dir: Files | number, name: string, sizes: Sizes) => {
  const dirName = name || "/";
  sizes[dirName] = 0;
  Object.entries(dir).forEach(([nm, file]) => {
    if (typeof file === "number") {
      sizes[dirName] += file;
      return;
    }

    sizes[dirName] += getDirSize(file, `${name}/${nm}`, sizes);
  });

  return sizes[dirName];
};

const getAllDirSizes = (dir: Files) => {
  const sizes: Sizes = {};
  getDirSize(dir["/"], "", sizes);

  return sizes;
};

const getDirWithSpecificSize = (
  sizes: Sizes
): { dirs: string[]; total: number } => {
  const limit = 100000;
  const res = {
    dirs: [] as string[],
    total: 0,
  };

  Object.entries(sizes).forEach(([name, size]) => {
    if (size > limit) {
      return;
    }
    res.dirs.push(name);
    res.total += size;
  });

  return res;
};

const getPrintStrings = (files: Files, prefix = "-", printInfo: string[]) => {
  Object.entries(files).forEach((entries) => {
    const [name, file] = entries as [string, Files | File];
    if (typeof file === "number") {
      printInfo.push(`${prefix} ${name} (file, size=${file})`);
      return;
    }
    printInfo.push(`${prefix} ${name} (dir)`);
    getPrintStrings(files[name] as Files, `  ${prefix}`, printInfo);
  });
};

const printFiles = (files: Files) => {
  const printInfo: string[] = [];

  getPrintStrings(files, "-", printInfo);

  console.log(printInfo.join("\n"));
};

const checkDuplicates = (files: Files): boolean => {
  const allFileNames = Object.keys(files);
  const uniqueNames = new Set(allFileNames);

  let areDuplicates = allFileNames.length !== uniqueNames.size;

  Object.values(files).forEach((file) => {
    if (typeof file !== "number" && checkDuplicates(file)) {
      areDuplicates = true;
    }
  });
  return areDuplicates;
};

export const getTotalSizeSmallDirectories = (input: string) => {
  const localFS = createFS();
  const instructrions = input.split("\n").map((line) => line.trim());

  instructrions.forEach((inst) => {
    performAction(localFS)(inst);
  });

  const sizes: Sizes = getAllDirSizes(localFS.files);

  // printFiles(localFS.files);

  const res = getDirWithSpecificSize(sizes);

  return res.total;
};

const getMinSizeToDelete = (sizes: Sizes) => {
  const totalUsedSpace = sizes["/"];
  const requiredSpace = 30000000;
  const totalSpace = 70000000;
  return requiredSpace - (totalSpace - totalUsedSpace);
};

const getFolderToDelete = (sizes: Sizes, limit: number) => {
  const allPosibleFolders = Object.entries(sizes)
    .filter(([, size]) => size >= limit)
    .sort((a, b) => a[1] - b[1]);

  const preferredFolder = allPosibleFolders[0];

  return {
    name: preferredFolder[0],
    size: preferredFolder[1],
  };
};

export const getSizeDirToDelete = (input: string) => {
  const localFS = createFS();
  const instructrions = input.split("\n").map((line) => line.trim());

  instructrions.forEach((inst) => {
    performAction(localFS)(inst);
  });

  const sizes: Sizes = getAllDirSizes(localFS.files);

  const spaceToFree = getMinSizeToDelete(sizes);

  const folder = getFolderToDelete(sizes, spaceToFree);

  return folder.size;
};
